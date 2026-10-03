const translations = {
    tr: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'Arada kalmak yok. Sadece tek ve net bir cevap.', topicPlaceholder: 'Neye karar veriyoruz? (Örn: Bugün ne yesek?)', placeholder: 'Seçenek', button: 'Karar Ver', errMin: 'Lütfen karar verilebilmesi için en az iki seçenek girin.', errApi: 'API Hatası. Lütfen API anahtarını kontrol edin.' },
    en: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'No more indecision. Just one clear answer.', topicPlaceholder: 'What are we deciding on? (e.g. What to eat today?)', placeholder: 'Option', button: 'Decide', errMin: 'Please enter at least two options.', errApi: 'API Error. Please check your key.' },
    es: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'No más indecisión. Solo una respuesta clara.', topicPlaceholder: '¿Qué estamos decidiendo? (ej. ¿Qué comer hoy?)', placeholder: 'Opción', button: 'Decidir', errMin: 'Por favor ingrese al menos dos opciones.', errApi: 'Error de API.' },
    fr: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'Plus d\'indécision. Juste une réponse claire.', topicPlaceholder: 'Sur quoi décidons-nous ? (ex. Que manger aujourd\'hui ?)', placeholder: 'Option', button: 'Décider', errMin: 'Veuillez entrer au moins deux options.', errApi: 'Erreur API.' },
    de: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'Keine Unentschlossenheit mehr. Nur eine klare Antwort.', topicPlaceholder: 'Was entscheiden wir? (z.B. Was essen wir heute?)', placeholder: 'Option', button: 'Entscheiden', errMin: 'Bitte geben Sie mindestens zwei Optionen ein.', errApi: 'API-Fehler.' },
    it: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'Niente più indecisioni. Solo una risposta chiara.', topicPlaceholder: 'Cosa stiamo decidendo? (es. Cosa mangiare oggi?)', placeholder: 'Opzione', button: 'Decidere', errMin: 'Inserisci almeno due opzioni.', errApi: 'Errore API.' },
    pt: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'Sem mais indecisões. Apenas uma resposta clara.', topicPlaceholder: 'O que estamos decidindo? (ex. O que comer hoje?)', placeholder: 'Opção', button: 'Decidir', errMin: 'Insira pelo menos duas opções.', errApi: 'Erro de API.' },
    ru: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'Больше никаких сомнений. Только один ясный ответ.', topicPlaceholder: 'Что мы решаем? (напр. Что сегодня поесть?)', placeholder: 'Вариант', button: 'Решить', errMin: 'Пожалуйста, введите как минимум два варианта.', errApi: 'Ошибка API.' },
    zh: { title: 'Decision <span class="highlight">AI</span>', subtitle: '不再犹豫。只有一个明确的答案。', topicPlaceholder: '我们要决定什么？ (例如：今天吃什么？)', placeholder: '选项', button: '决定', errMin: '请至少输入两个选项。', errApi: 'API 错误。' },
    ja: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'もう迷わない。明確な答えを一つだけ。', topicPlaceholder: '何を決定しますか？ (例: 今日は何を食べる？)', placeholder: 'オプション', button: '決定する', errMin: '少なくとも2つのオプションを入力してください。', errApi: 'APIエラー。' },
    ko: { title: 'Decision <span class="highlight">AI</span>', subtitle: '더 이상 망설이지 마세요. 단 하나의 명확한 대답.', topicPlaceholder: '무엇을 결정하시겠습니까? (예: 오늘 뭐 먹지?)', placeholder: '옵션', button: '결정하다', errMin: '최소 두 개의 옵션을 입력하세요.', errApi: 'API 오류.' },
    ar: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'لا مزيد من التردد. مجرد إجابة واحدة واضحة.', topicPlaceholder: 'ما الذي نقرره؟ (مثلا: ماذا نأكل اليوم؟)', placeholder: 'خيار', button: 'يقرر', errMin: 'الرجاء إدخال خيارين على الأقل.', errApi: 'خطأ في واجهة برمجة التطبيقات.' },
    hi: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'कोई और दुविधा नहीं। बस एक स्पष्ट उत्तर।', topicPlaceholder: 'हम क्या तय कर रहे हैं? (उदा. आज क्या खाएं?)', placeholder: 'विकल्प', button: 'निर्णय लें', errMin: 'कृपया कम से कम दो विकल्प दर्ज करें।', errApi: 'एपीआई त्रुटि।' },
    bn: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'আর কোনো দ্বিধা নেই। শুধু একটি স্পষ্ট উত্তর।', topicPlaceholder: 'আমরা কি সিদ্ধান্ত নিচ্ছি? (উদাঃ আজ কি খাবেন?)', placeholder: 'বিকল্প', button: 'সিদ্ধান্ত নিন', errMin: 'অনুগ্রহ করে অন্তত দুটি বিকল্প লিখুন।', errApi: 'এপিআই ত্রুটি।' },
    ur: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'مزید کوئی ہچکچاہٹ نہیں۔ صرف ایک واضح جواب۔', topicPlaceholder: 'ہم کیا فیصلہ کر رہے ہیں؟ (مثلا آج کیا کھائیں؟)', placeholder: 'آپشن', button: 'فیصلہ کریں', errMin: 'براہ کرم کم از کم دو اختیارات درج کریں۔', errApi: 'اے پی آئی کی خرابی۔' },
    id: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'Tidak ada lagi keragu-raguan. Hanya satu jawaban yang jelas.', topicPlaceholder: 'Apa yang kita putuskan? (mis. Makan apa hari ini?)', placeholder: 'Opsi', button: 'Memutuskan', errMin: 'Harap masukkan setidaknya dua opsi.', errApi: 'Kesalahan API.' },
    ms: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'Tiada lagi keraguan. Hanya satu jawapan yang jelas.', topicPlaceholder: 'Apa yang kita putuskan? (cth. Makan apa hari ini?)', placeholder: 'Pilihan', button: 'Memutuskan', errMin: 'Sila masukkan sekurang-kurangnya dua pilihan.', errApi: 'Ralat API.' },
    vi: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'Không còn do dự. Chỉ một câu trả lời rõ ràng.', topicPlaceholder: 'Chúng ta quyết định điều gì? (vd. Hôm nay ăn gì?)', placeholder: 'Tùy chọn', button: 'Quyết định', errMin: 'Vui lòng nhập ít nhất hai tùy chọn.', errApi: 'Lỗi API.' },
    th: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'ไม่มีความลังเลอีกต่อไป เพียงหนึ่งคำตอบที่ชัดเจน', topicPlaceholder: 'เรากำลังตัดสินใจเรื่องอะไร? (เช่น วันนี้กินอะไรดี?)', placeholder: 'ตัวเลือก', button: 'ตัดสินใจ', errMin: 'โปรดป้อนอย่างน้อยสองตัวเลือก', errApi: 'ข้อผิดพลาด API' },
    nl: { title: 'Decision <span class="highlight">AI</span>', subtitle: 'Geen besluiteloosheid meer. Slechts één duidelijk antwoord.', topicPlaceholder: 'Wat beslissen we? (bijv. Wat eten we vandaag?)', placeholder: 'Optie', button: 'Beslissen', errMin: 'Voer ten minste twee opties in.', errApi: 'API-fout.' }
};

document.addEventListener('DOMContentLoaded', () => {
    const optionsContainer = document.getElementById('optionsContainer');
    const decideBtn = document.getElementById('decideBtn');
    const resultBox = document.getElementById('resultBox');
    const answerText = document.getElementById('answerText');
    const loader = document.getElementById('loader');
    const languageSelect = document.getElementById('languageSelect');
    const topicInput = document.getElementById('topicInput');
    
    const mainTitle = document.getElementById('mainTitle');
    const mainSubtitle = document.getElementById('mainSubtitle');

    const MAX_OPTIONS = 20;

    let optionCount = 0;
    let currentLang = 'tr';
    
    // Change language event
    languageSelect.addEventListener('change', (e) => {
        currentLang = e.target.value;
        updateLanguage();
    });

    function updateLanguage() {
        const langData = translations[currentLang];
        mainTitle.innerHTML = langData.title;
        mainSubtitle.textContent = langData.subtitle;
        decideBtn.textContent = langData.button;
        if (topicInput) {
            topicInput.placeholder = langData.topicPlaceholder;
        }
        
        // Update placeholders
        const inputs = Array.from(optionsContainer.querySelectorAll('.option-input'));
        inputs.forEach((input, index) => {
            input.placeholder = `${langData.placeholder} ${index + 1}...`;
        });
        
        document.documentElement.lang = currentLang;
        if (currentLang === 'ar' || currentLang === 'ur') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
    }

    // Initialize with 2 empty options
    addOptionInput();
    addOptionInput();
    updateLanguage();

    function addOptionInput() {
        if (optionCount >= MAX_OPTIONS) return;

        optionCount++;
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'option-input';
        
        const langData = translations[currentLang] || translations['tr'];
        input.placeholder = `${langData.placeholder} ${optionCount}...`;
        input.autocomplete = 'off';

        input.addEventListener('input', handleInput);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                decide();
            }
        });

        optionsContainer.appendChild(input);
        
        // Scroll to the bottom if container overflows
        optionsContainer.scrollTop = optionsContainer.scrollHeight;
    }

    function handleInput(e) {
        const inputs = Array.from(optionsContainer.querySelectorAll('.option-input'));
        const lastInput = inputs[inputs.length - 1];

        // If the last input has some text and we haven't reached max options, add a new one
        if (lastInput.value.trim() !== '' && inputs.length < MAX_OPTIONS) {
            addOptionInput();
        }
    }

    decideBtn.addEventListener('click', decide);

    async function decide() {
        const inputs = Array.from(optionsContainer.querySelectorAll('.option-input'));
        const options = inputs.map(input => input.value.trim()).filter(val => val !== '');
        const topic = topicInput ? topicInput.value.trim() : '';
        const langData = translations[currentLang];

        if (options.length < 2) {
            showResult(langData.errMin, true);
            return;
        }

        // Show loader
        resultBox.classList.remove('hidden');
        answerText.innerHTML = '';
        answerText.classList.add('hidden');
        loader.classList.remove('hidden');
        decideBtn.disabled = true;
        decideBtn.style.opacity = '0.7';
        answerText.style.color = ''; // Reset color

        try {
            const answer = await fetchGeminiDecision(API_KEY, options, topic);
            showResult(answer);
        } catch (error) {
            console.error(error);
            // Hatanın gerçek nedenini ekranda göster
            showResult(langData.errApi + ' (' + error.message + ')', true);
        } finally {
            loader.classList.add('hidden');
            decideBtn.disabled = false;
            decideBtn.style.opacity = '1';
        }
    }

    function showResult(text, isError = false) {
        loader.classList.add('hidden');
        answerText.classList.remove('hidden');
        
        if (isError) {
            answerText.textContent = text;
        } else {
            // Basit markdown (kalın yazı ve alt satıra geçme) desteği
            let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            formattedText = formattedText.replace(/\n/g, '<br>');
            answerText.innerHTML = formattedText;
        }
        
        if (isError) {
            answerText.style.color = '#ff6b6b';
        } else {
            answerText.style.color = 'var(--text-main)';
            answerText.style.background = 'none';
            answerText.style.webkitTextFillColor = 'initial';
        }
        
        // Retrigger animation
        answerText.style.animation = 'none';
        answerText.offsetHeight; /* trigger reflow */
        answerText.style.animation = null; 
    }

    async function fetchGeminiDecision(apiKey, options, topic) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;
        
        let systemPrompt = `Sen kararsız kalan kullanıcılara yardımcı olan net bir Karar Yapay Zekasısın (Decision AI). 
Kullanıcı sana numaralandırılmış seçenekler sunacak.`;

        if (topic) {
            systemPrompt += `\nKullanıcının karar vermek istediği konu şudur: "${topic}"\nKararını mutlaka bu bağlama uygun olarak ver.`;
        }

        systemPrompt += `
GÖREVİN:
1. Bu seçenekler arasından kesin ve net bir şekilde sadece BİR TANESİNİ seçmek. Asla "hepsi güzel", "sana bağlı" gibi orta yolcu veya kaçamak cevaplar verme.
2. Seçtiğin bu seçeneğin neden en iyi tercih olduğunu mantıklı, ikna edici ve tatmin edici bir şekilde açıkla.
3. Açıklamanı çok uzatmadan ama yeterince detaylı bir şekilde yap.
Cevabını kullanıcının diline sadık kalarak ver.`;

        const optionsText = options.map((opt, i) => `${i + 1}. ${opt}`).join('\n');

        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt + "\n\nSeçenekler:\n" + optionsText }]
                }
            ],
            generationConfig: {
                temperature: 0.8,
                maxOutputTokens: 2048
            }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            let errorMsg = 'API Hatası';
            if (data.error && data.error.message) {
                errorMsg = data.error.message;
            }
            throw new Error(errorMsg);
        }
        
        if (data.candidates && data.candidates.length > 0) {
            const candidate = data.candidates[0];
            if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                return candidate.content.parts[0].text.trim();
            } else if (candidate.finishReason && candidate.finishReason !== "STOP") {
                throw new Error(`Cevap reddedildi (Sebep: ${candidate.finishReason})`);
            } else {
                throw new Error('API beklenmeyen bir format döndürdü: ' + JSON.stringify(data).substring(0, 100));
            }
        } else if (data.promptFeedback) {
            throw new Error('Sorunuz güvenlik filtresine takıldı.');
        } else {
            throw new Error('Cevap alınamadı. (Veri boş)');
        }
    }
});
