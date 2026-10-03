import 'dart:convert';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'api_key.dart';

void main() {
  runApp(const DecisionAIApp());
}

class DecisionAIApp extends StatelessWidget {
  const DecisionAIApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Decision AI',
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0D0E15),
        textTheme: GoogleFonts.outfitTextTheme(ThemeData.dark().textTheme),
      ),
      home: const DecisionScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class DecisionScreen extends StatefulWidget {
  const DecisionScreen({super.key});

  @override
  State<DecisionScreen> createState() => _DecisionScreenState();
}

class _DecisionScreenState extends State<DecisionScreen> with TickerProviderStateMixin {
  final int maxOptions = 20;

  List<TextEditingController> controllers = [];
  final TextEditingController _topicController = TextEditingController();
  String currentLang = 'tr';
  bool isLoading = false;
  String? resultText;
  String? errorMessage;

  late AnimationController _orb1Controller;
  late AnimationController _orb2Controller;

  final Map<String, Map<String, String>> translations = {
    'tr': {'title': 'Decision', 'subtitle': 'Arada kalmak yok. Sadece tek ve net bir cevap.', 'topicPlaceholder': 'Neye karar veriyoruz? (Örn: Bugün ne yesek?)', 'placeholder': 'Seçenek', 'button': 'Karar Ver', 'errMin': 'Lütfen en az iki seçenek girin.', 'errApi': 'API Hatası.'},
    'en': {'title': 'Decision', 'subtitle': 'No more indecision. Just one clear answer.', 'topicPlaceholder': 'What are we deciding on? (e.g. What to eat today?)', 'placeholder': 'Option', 'button': 'Decide', 'errMin': 'Please enter at least two options.', 'errApi': 'API Error.'},
    'es': {'title': 'Decision', 'subtitle': 'No más indecisión. Solo una respuesta clara.', 'topicPlaceholder': '¿Qué estamos decidiendo? (ej. ¿Qué comer hoy?)', 'placeholder': 'Opción', 'button': 'Decidir', 'errMin': 'Por favor ingrese al menos dos opciones.', 'errApi': 'Error de API.'},
  };

  @override
  void initState() {
    super.initState();
    _addOption();
    _addOption();

    _orb1Controller = AnimationController(vsync: this, duration: const Duration(seconds: 10))..repeat(reverse: true);
    _orb2Controller = AnimationController(vsync: this, duration: const Duration(seconds: 8))..repeat(reverse: true);
  }

  @override
  void dispose() {
    for (var c in controllers) {
      c.dispose();
    }
    _topicController.dispose();
    _orb1Controller.dispose();
    _orb2Controller.dispose();
    super.dispose();
  }

  void _addOption() {
    if (controllers.length >= maxOptions) return;
    final controller = TextEditingController();
    controller.addListener(_onInputChanged);
    setState(() {
      controllers.add(controller);
    });
  }

  void _onInputChanged() {
    if (controllers.last.text.trim().isNotEmpty && controllers.length < maxOptions) {
      _addOption();
    }
  }

  Future<void> _decide() async {
    final options = controllers.map((c) => c.text.trim()).where((t) => t.isNotEmpty).toList();
    final langData = translations[currentLang]!;

    if (options.length < 2) {
      setState(() {
        errorMessage = langData['errMin'];
        resultText = null;
      });
      return;
    }

    setState(() {
      isLoading = true;
      errorMessage = null;
      resultText = null;
    });

    try {
      final topic = _topicController.text.trim();
      final answer = await _fetchGeminiDecision(options, topic);
      setState(() {
        resultText = answer;
      });
    } catch (e) {
      setState(() {
        errorMessage = '${langData['errApi']} ($e)';
      });
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<String> _fetchGeminiDecision(List<String> options, String topic) async {
    final url = Uri.parse('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=$apiKey');
    
    String systemPrompt = '''Sen kararsız kalan kullanıcılara yardımcı olan net bir Karar Yapay Zekasısın (Decision AI). 
Kullanıcı sana numaralandırılmış seçenekler sunacak.''';

    if (topic.isNotEmpty) {
      systemPrompt += '\\nKullanıcının karar vermek istediği konu şudur: "\$topic"\\nKararını mutlaka bu bağlama uygun olarak ver.';
    }

    systemPrompt += '''

GÖREVİN:
1. Bu seçenekler arasından kesin ve net bir şekilde sadece BİR TANESİNİ seçmek. Asla "hepsi güzel", "sana bağlı" gibi orta yolcu veya kaçamak cevaplar verme.
2. Seçtiğin bu seçeneğin neden en iyi tercih olduğunu mantıklı, ikna edici ve tatmin edici bir şekilde açıkla.
3. Açıklamanı çok uzatmadan ama yeterince detaylı bir şekilde yap.
Cevabını kullanıcının diline sadık kalarak ver.''';

    final optionsText = options.asMap().entries.map((e) => '${e.key + 1}. ${e.value}').join('\\n');

    final payload = {
      "contents": [
        {
          "role": "user",
          "parts": [{"text": "$systemPrompt\\n\\nSeçenekler:\\n$optionsText"}]
        }
      ],
      "generationConfig": {
        "temperature": 0.8,
        "maxOutputTokens": 2048
      }
    };

    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(payload),
    );

    final data = jsonDecode(response.body);

    if (response.statusCode != 200) {
      throw Exception(data['error']?['message'] ?? 'API Error');
    }

    if (data['candidates'] != null && data['candidates'].isNotEmpty) {
      final candidate = data['candidates'][0];
      if (candidate['content'] != null && candidate['content']['parts'] != null && candidate['content']['parts'].isNotEmpty) {
        return candidate['content']['parts'][0]['text'].trim();
      } else if (candidate['finishReason'] != null && candidate['finishReason'] != "STOP") {
        throw Exception('Cevap reddedildi (Sebep: ${candidate["finishReason"]})');
      } else {
        throw Exception('API beklenmeyen bir format döndürdü');
      }
    } else if (data['promptFeedback'] != null) {
      throw Exception('Sorunuz güvenlik filtresine takıldı.');
    } else {
      throw Exception('Cevap alınamadı.');
    }
  }

  @override
  Widget build(BuildContext context) {
    final langData = translations[currentLang]!;

    return Scaffold(
      body: Stack(
        children: [
          // Background Orbs
          AnimatedBuilder(
            animation: _orb1Controller,
            builder: (context, child) {
              return Positioned(
                top: -100 + (_orb1Controller.value * 50),
                left: -100 + (_orb1Controller.value * 50),
                child: Container(
                  width: 400, height: 400,
                  decoration: const BoxDecoration(shape: BoxShape.circle, color: Color(0xFF6366F1)),
                ),
              );
            },
          ),
          AnimatedBuilder(
            animation: _orb2Controller,
            builder: (context, child) {
              return Positioned(
                bottom: -50 - (_orb2Controller.value * 50),
                right: -50 - (_orb2Controller.value * 50),
                child: Container(
                  width: 300, height: 300,
                  decoration: const BoxDecoration(shape: BoxShape.circle, color: Color(0xFF8B5CF6)),
                ),
              );
            },
          ),
          BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 100, sigmaY: 100),
            child: Container(color: Colors.transparent),
          ),
          
          SafeArea(
            child: Column(
              children: [
                Align(
                  alignment: Alignment.topRight,
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: DropdownButton<String>(
                      value: currentLang,
                      dropdownColor: const Color(0xFF1E1E2C),
                      underline: const SizedBox(),
                      icon: const Icon(Icons.language, color: Colors.white),
                      items: const [
                        DropdownMenuItem(value: 'tr', child: Text('Türkçe')),
                        DropdownMenuItem(value: 'en', child: Text('English')),
                        DropdownMenuItem(value: 'es', child: Text('Español')),
                      ],
                      onChanged: (val) {
                        if (val != null) setState(() => currentLang = val);
                      },
                    ),
                  ),
                ),
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.symmetric(horizontal: 24),
                    child: Container(
                      padding: const EdgeInsets.all(24),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.05),
                        borderRadius: BorderRadius.circular(24),
                        border: Border.all(color: Colors.white.withOpacity(0.1)),
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          RichText(
                            text: TextSpan(
                              style: GoogleFonts.outfit(fontSize: 48, fontWeight: FontWeight.bold),
                              children: [
                                TextSpan(text: langData['title']! + ' '),
                                const TextSpan(
                                  text: 'AI',
                                  style: TextStyle(color: Color(0xFFC084FC)),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            langData['subtitle']!,
                            textAlign: TextAlign.center,
                            style: TextStyle(color: Colors.grey[400], fontSize: 16),
                          ),
                          const SizedBox(height: 30),
                          
                          TextField(
                            controller: _topicController,
                            textAlign: TextAlign.center,
                            style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w500),
                            decoration: InputDecoration(
                              hintText: langData['topicPlaceholder'],
                              hintStyle: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 16),
                              filled: true,
                              fillColor: const Color(0xFF6366F1).withOpacity(0.1),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(16),
                                borderSide: BorderSide(color: const Color(0xFF6366F1).withOpacity(0.3)),
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(16),
                                borderSide: BorderSide(color: const Color(0xFF6366F1).withOpacity(0.3)),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(16),
                                borderSide: const BorderSide(color: Color(0xFF818CF8)),
                              ),
                            ),
                          ),
                          const SizedBox(height: 20),
                          
                          ListView.builder(
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            itemCount: controllers.length,
                            itemBuilder: (context, index) {
                              return Padding(
                                padding: const EdgeInsets.only(bottom: 12),
                                child: TextField(
                                  controller: controllers[index],
                                  style: const TextStyle(color: Colors.white),
                                  decoration: InputDecoration(
                                    hintText: '${langData["placeholder"]} ${index + 1}...',
                                    hintStyle: TextStyle(color: Colors.grey[500]),
                                    filled: true,
                                    fillColor: Colors.black.withOpacity(0.3),
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(16),
                                      borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
                                    ),
                                    enabledBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(16),
                                      borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
                                    ),
                                    focusedBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(16),
                                      borderSide: const BorderSide(color: Color(0xFF818CF8)),
                                    ),
                                  ),
                                ),
                              );
                            },
                          ),
                          const SizedBox(height: 20),
                          
                          SizedBox(
                            width: double.infinity,
                            height: 56,
                            child: ElevatedButton(
                              onPressed: isLoading ? null : _decide,
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF6366F1),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                              ),
                              child: isLoading 
                                ? const CircularProgressIndicator(color: Colors.white)
                                : Text(
                                    langData['button']!,
                                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                                  ),
                            ),
                          ),
                          
                          if (errorMessage != null) ...[
                            const SizedBox(height: 20),
                            Text(errorMessage!, style: const TextStyle(color: Colors.redAccent, fontSize: 16)),
                          ],
                          
                          if (resultText != null) ...[
                            const SizedBox(height: 20),
                            Container(
                              padding: const EdgeInsets.all(20),
                              width: double.infinity,
                              decoration: BoxDecoration(
                                color: const Color(0xFF6366F1).withOpacity(0.1),
                                borderRadius: BorderRadius.circular(16),
                                border: Border.all(color: const Color(0xFF6366F1).withOpacity(0.3)),
                              ),
                              child: MarkdownBody(
                                data: resultText!,
                                styleSheet: MarkdownStyleSheet(
                                  p: const TextStyle(color: Colors.white, fontSize: 16, height: 1.5),
                                ),
                              ),
                            ),
                          ],
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
