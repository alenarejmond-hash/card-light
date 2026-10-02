import React, { useState, useEffect } from 'react';
import { QrCode, UserPlus } from 'lucide-react';

const CONTENT = {
  ru: {
    name: "ЕЛЕНА СОТНИКОВА",
    sphere: "DIGITAL CREATOR & WEB DEVELOPER",
    quote: "«Создаю цифровые экосистемы, в которые влюбляются»",
    saveBtn: "Сохранить контакт",
    close: "Закрыть",
    scan: "Отсканируйте, чтобы сохранить"
  },
  en: {
    name: "ELENA SOTNIKOVA",
    sphere: "DIGITAL CREATOR & WEB DEVELOPER",
    quote: "«I create digital ecosystems people fall in love with»",
    saveBtn: "Save Contact",
    close: "Close",
    scan: "Scan to save"
  },
  hy: {
    name: "ԵԼԵՆԱ ՍՈՏՆԻԿՈՎԱ",
    sphere: "DIGITAL CREATOR & WEB DEVELOPER",
    quote: "«Ստեղծում եմ թվային էկոհամակարգեր, որոնց սիրահարվում են»",
    saveBtn: "Պահպանել կոնտակտը",
    close: "Փակել",
    scan: "Սկանավորեք պահպանելու համար"
  }
};

const SOCIAL_LINKS = {
  phone: "+37494261123",
  whatsapp: "+79995051277",
  telegram: "elenlime",
  instagram: "appseapro",
  website: "https://appseapro.com"
};

const App = () => {
  const [lang, setLang] = useState('ru');
  const [showQR, setShowQR] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('glass'); // 'glass' или 'infinite'
  const [isAirSocialOpen, setIsAirSocialOpen] = useState(false);
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false); // Новое состояние для меню

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownloadVCF = () => {
    // Разделяем имя и фамилию для правильного сохранения (Apple/Android требуют поле N)
    const fullName = CONTENT[lang].name;
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${lastName};${firstName};;;`,
      `FN:${fullName}`,
      `ORG:Premium Web`,
      `TITLE:${CONTENT[lang].sphere}`,
      `TEL;TYPE=CELL:${SOCIAL_LINKS.phone}`,
      `URL;TYPE=Telegram:https://t.me/${SOCIAL_LINKS.telegram}`,
      `URL;TYPE=Website:${SOCIAL_LINKS.website}`,
      "END:VCARD"
    ].join("\r\n");

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Elena_Sotnikova.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!mounted) return null;

  const t = CONTENT[lang];

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center font-sans antialiased overflow-hidden">
      
      {/* Подключение премиальных шрифтов и ИСПРАВЛЕННОЙ анимации */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@200;300;400&family=Lato:ital,wght@0,300;0,400;1,300&family=Montserrat:wght@200;300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');
        
        /* Шрифты для Glass (Классика) */
        .font-serif-lux { font-family: 'Cormorant Garamond', serif; }
        .font-sans-lux { font-family: 'Montserrat', sans-serif; }

        /* Шрифты для Infinite (Модерн) */
        .font-serif-inf { font-family: 'Playfair Display', serif; }

        /* Шрифты для Cinema (Эпичный/Кино) */
        .font-serif-cin { font-family: 'Cinzel', serif; }
        .font-sans-cin { font-family: 'Lato', sans-serif; }

        /* Шрифты для Air (Vogue/Глянец) */
        .font-serif-air { font-family: 'Bodoni Moda', serif; }
        .font-sans-air { font-family: 'Jost', sans-serif; }

        /* Обновленная, более заметная анимация Ken Burns */
        @keyframes ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }

        .animate-ken-burns {
          animation: ken-burns 20s ease-in-out infinite alternate;
          transform-origin: center top;
          will-change: transform;
        }

        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Главный контейнер (Сайт-постер) */}
      <div className="relative w-full h-[100dvh] max-w-md sm:h-[90dvh] sm:rounded-[2.5rem] sm:border sm:border-white/10 sm:shadow-[0_0_80px_rgba(255,255,255,0.05)] overflow-hidden bg-[#050505]">
        
        {/* ФОНОВОЕ ФОТО С АНИМАЦИЕЙ */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img 
            src={{
              glass: 'photo-glass.jpg',
              infinite: 'photo-infinite.jpg',
              cinema: 'photo-cinema.jpg',
              air: 'photo-air.jpg'
            }[theme]} 
            alt="Elena Sotnikova" 
            className="w-full h-full object-cover object-[center_15%] animate-ken-burns opacity-90"
          />
        </div>

        {/* СМЯГЧЕННЫЙ ГРАДИЕНТ, ЧТОБЫ БЫЛО ВИДНО ФОТО */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none"></div>

        {/* ПЕРЕКЛЮЧАТЕЛЬ ШАБЛОНОВ (Компактный выпадающий список) */}
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center">
          <button 
            onClick={() => setShowThemeSwitcher(!showThemeSwitcher)} 
            className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full text-[10px] font-sans-lux font-medium tracking-widest uppercase text-white shadow-2xl hover:bg-black/80 transition-all active:scale-95"
          >
            <span className="opacity-50">Theme:</span> {theme}
            <svg className={`w-3 h-3 transition-transform duration-300 ${showThemeSwitcher ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          
          <div className={`absolute top-full mt-2 flex flex-col gap-1 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl transition-all duration-300 origin-top ${showThemeSwitcher ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
            {['glass', 'infinite', 'cinema', 'air'].map((t) => (
              <button 
                key={t}
                onClick={() => { setTheme(t); setShowThemeSwitcher(false); }} 
                className={`px-6 py-2.5 rounded-xl text-[10px] font-sans-lux font-medium tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${theme === t ? 'bg-white text-black shadow-md' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================
            ШАБЛОН 1: GLASS
            ========================================= */}
        {theme === 'glass' && (
          <>
            {/* HEADER - Glass Style */}
            <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-start z-20">
              <div className="flex gap-3 relative">
                <button 
                  onClick={() => setShowQR(true)}
                  className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all active:scale-95 shadow-lg"
                >
                  <QrCode className="w-5 h-5 font-light" strokeWidth={1.5} />
                </button>
                
                {/* Иконка Сохранения с подсказкой */}
                <div className="relative group">
                  <button 
                    onClick={handleDownloadVCF}
                    className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all active:scale-95 shadow-lg"
                  >
                    <UserPlus className="w-5 h-5 font-light" strokeWidth={1.5} />
                  </button>
                  {/* Всплывающая подсказка */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1.5 rounded-lg text-[9px] font-sans-lux tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                    {t.saveBtn}
                  </div>
                </div>
              </div>

              <div className="flex bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-lg">
                {['hy', 'ru', 'en'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-sans-lux font-medium tracking-widest uppercase transition-all duration-300 ${
                      lang === l 
                        ? 'bg-white text-black shadow-md' 
                        : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    {l === 'hy' ? 'AM' : l}
                  </button>
                ))}
              </div>
            </div>

            {/* НИЖНЯЯ ПАНЕЛЬ - Glass Style */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl shadow-lg flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <p className="font-sans-lux text-[9px] tracking-[0.3em] uppercase text-white/60 mb-2 font-light">
                  {t.sphere}
                </p>
                <h1 className="font-serif-lux text-2xl sm:text-3xl font-normal text-white mb-2 tracking-wide leading-none">
                  {t.name}
                </h1>
                <p className="font-serif-lux italic text-[14px] text-white/70 mb-5 font-light">
                  {t.quote}
                </p>
                
                {/* Социальные сети - ровно 1 ряд */}
                <div className="flex items-center justify-center gap-4 w-full">
                  <a href={`https://t.me/${SOCIAL_LINKS.telegram}`} target="_blank" rel="noreferrer" className="group p-2.5 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                    <svg className="w-4 h-4 text-white/80 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                  </a>
                  <a href={`https://instagram.com/${SOCIAL_LINKS.instagram}`} target="_blank" rel="noreferrer" className="group p-2.5 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                    <svg className="w-4 h-4 text-white/80 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  <a href={`https://wa.me/${SOCIAL_LINKS.whatsapp}`} target="_blank" rel="noreferrer" className="group p-2.5 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                    <svg className="w-4 h-4 text-white/80 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                  </a>
                  <a href={`tel:${SOCIAL_LINKS.phone}`} className="group p-2.5 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                    <svg className="w-4 h-4 text-white/80 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}

        {/* =========================================
            ШАБЛОН 2: INFINITE
            ========================================= */}
        {theme === 'infinite' && (
          <>
            <div className="absolute top-0 left-0 bottom-0 w-16 bg-black/40 backdrop-blur-xl border-r border-white/5 z-20 flex flex-col justify-between py-8 items-center">
              <div className="flex flex-col gap-4 mt-12">
                {['en', 'ru', 'hy'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`text-[10px] font-sans-lux font-bold tracking-widest uppercase transition-all duration-300 ${
                      lang === l ? 'text-white' : 'text-white/30 hover:text-white/70'
                    }`}
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    {l === 'hy' ? 'AM' : l}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-6">
                <a href={`https://t.me/${SOCIAL_LINKS.telegram}`} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white hover:scale-110 transition-all duration-300"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg></a>
                <a href={`https://instagram.com/${SOCIAL_LINKS.instagram}`} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white hover:scale-110 transition-all duration-300"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
                <a href={`https://wa.me/${SOCIAL_LINKS.whatsapp}`} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white hover:scale-110 transition-all duration-300"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg></a>
                <a href={`tel:${SOCIAL_LINKS.phone}`} className="text-white/50 hover:text-white hover:scale-110 transition-all duration-300"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>
              </div>
              <div className="flex flex-col gap-4 mb-4">
                <button onClick={handleDownloadVCF} className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all active:scale-95" title={t.saveBtn}><UserPlus className="w-5 h-5 font-light" strokeWidth={1.5} /></button>
                <button onClick={() => setShowQR(true)} className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all active:scale-95"><QrCode className="w-5 h-5 font-light" strokeWidth={1.5} /></button>
              </div>
            </div>
            <div className="absolute bottom-10 right-6 left-20 z-20 flex flex-col items-end text-right">
              <p className="font-sans-lux text-[9px] tracking-[0.3em] uppercase text-white/60 mb-2 font-light">{t.sphere}</p>
              <h1 className="font-serif-inf text-3xl sm:text-4xl font-normal text-white mb-3 tracking-wide leading-none">{t.name}</h1>
              <p className="font-serif-inf italic text-[15px] text-white/70 mb-2 font-light max-w-[200px]">{t.quote}</p>
            </div>
          </>
        )}

        {/* =========================================
            ШАБЛОН 3: CINEMA (Кинематографичный с черными полосами)
            ========================================= */}
        {theme === 'cinema' && (
          <>
            {/* Верхняя черная кино-полоса */}
            <div className="absolute top-0 left-0 right-0 h-[15%] min-h-[100px] bg-[#050505] z-20 flex justify-between items-center px-6 border-b border-white/10 shadow-2xl">
              <div className="flex gap-4">
                <button onClick={() => setShowQR(true)} className="text-white/50 hover:text-white hover:scale-110 transition-all"><QrCode className="w-6 h-6 font-light" strokeWidth={1.5} /></button>
                <button onClick={handleDownloadVCF} className="text-white/50 hover:text-white hover:scale-110 transition-all"><UserPlus className="w-6 h-6 font-light" strokeWidth={1.5} /></button>
              </div>
              <div className="flex gap-3">
                {['hy', 'ru', 'en'].map((l) => (
                  <button key={l} onClick={() => setLang(l)} className={`text-[10px] font-sans-cin font-bold tracking-widest uppercase transition-all duration-300 ${lang === l ? 'text-white' : 'text-white/30 hover:text-white/70'}`}>
                    {l === 'hy' ? 'AM' : l}
                  </button>
                ))}
              </div>
            </div>

            {/* Титры сдвинуты вниз, чтобы не перекрывать лицо */}
            <div className="absolute bottom-[18%] left-0 right-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6 text-center">
              <p className="font-sans-cin text-[10px] tracking-[0.4em] uppercase text-white/80 mb-3 font-light drop-shadow-lg">{t.sphere}</p>
              <h1 className="font-serif-cin text-3xl text-white mb-3 tracking-widest drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] font-semibold">{t.name}</h1>
              <p className="font-serif-cin italic text-[15px] text-white/90 font-light drop-shadow-lg">{t.quote}</p>
            </div>

            {/* Нижняя черная кино-полоса */}
            <div className="absolute bottom-0 left-0 right-0 h-[15%] min-h-[100px] bg-[#050505] z-20 flex items-center justify-center gap-8 border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
              <a href={`https://t.me/${SOCIAL_LINKS.telegram}`} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white hover:-translate-y-1 transition-all"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg></a>
              <a href={`https://instagram.com/${SOCIAL_LINKS.instagram}`} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white hover:-translate-y-1 transition-all"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
              <a href={`https://wa.me/${SOCIAL_LINKS.whatsapp}`} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white hover:-translate-y-1 transition-all"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg></a>
              <a href={`tel:${SOCIAL_LINKS.phone}`} className="text-white/50 hover:text-white hover:-translate-y-1 transition-all"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>
            </div>
          </>
        )}

        {/* =========================================
            ШАБЛОН 4: AIR (Editorial / Журнальный)
            ========================================= */}
        {theme === 'air' && (
          <>
            {/* Плавающие стеклянные кнопки сверху */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-3">
              <button onClick={() => setShowQR(true)} className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all shadow-xl">
                <QrCode className="w-4 h-4 font-light" strokeWidth={1.5} />
              </button>
              <button onClick={handleDownloadVCF} className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all shadow-xl">
                <UserPlus className="w-4 h-4 font-light" strokeWidth={1.5} />
              </button>
            </div>

            <div className="absolute top-6 right-6 z-20 flex flex-col gap-2 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full p-1.5 shadow-xl">
              {['hy', 'ru', 'en'].map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-sans-air font-bold tracking-widest uppercase transition-all duration-300 ${lang === l ? 'bg-white text-black' : 'text-white/50 hover:text-white/80'}`}>
                  {l === 'hy' ? 'AM' : l}
                </button>
              ))}
            </div>

            {/* Асимметричный блок текста (Стиль Vogue) */}
            <div className="absolute bottom-12 left-6 right-20 z-20 pointer-events-none">
              <div className="w-12 h-[1px] bg-white/50 mb-6"></div>
              <h1 className="font-serif-air text-3xl sm:text-4xl text-white mb-2 leading-[0.9] drop-shadow-2xl tracking-tight">
                {t.name.split(' ')[0]}<br/>
                <span className="italic text-white/90">{t.name.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="font-sans-air text-[9px] tracking-[0.4em] uppercase text-white/80 mt-6 mb-3 drop-shadow-md">{t.sphere}</p>
              <p className="font-serif-air italic text-[14px] text-white/90 drop-shadow-md">{t.quote}</p>
            </div>

            {/* Выезжающий блок соцсетей справа */}
            <div className={`absolute bottom-12 right-0 flex flex-col gap-3 z-20 transition-transform duration-500 ${isAirSocialOpen ? '-translate-x-6' : 'translate-x-[calc(100%)]'}`}>
              
              {/* Хвостик (кнопка открытия) */}
              <button 
                onClick={() => setIsAirSocialOpen(true)}
                className={`absolute top-1/2 -translate-y-1/2 -left-8 w-8 h-14 bg-white/5 backdrop-blur-xl border border-white/20 border-r-0 rounded-l-xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-opacity duration-300 ${isAirSocialOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>

              <a href={`https://t.me/${SOCIAL_LINKS.telegram}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:scale-110 transition-all shadow-xl"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg></a>
              <a href={`https://instagram.com/${SOCIAL_LINKS.instagram}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:scale-110 transition-all shadow-xl"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
              <a href={`https://wa.me/${SOCIAL_LINKS.whatsapp}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:scale-110 transition-all shadow-xl"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg></a>
              <a href={`tel:${SOCIAL_LINKS.phone}`} className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:scale-110 transition-all shadow-xl"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>
            </div>
          </>
        )}

        {/* MODAL: QR CODE */}
        <div 
          className={`absolute inset-0 z-50 flex items-center justify-center p-6 transition-all duration-500 bg-black/80 backdrop-blur-xl ${
            showQR ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div 
            className={`w-full max-w-[280px] bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center transition-all duration-500 transform ${
              showQR ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
            }`}
          >
            <div className="w-full bg-white p-4 rounded-2xl mb-6 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              <img 
                src="qr-code.png" 
                alt="QR Code" 
                className="w-full h-auto aspect-square object-contain opacity-90"
              />
            </div>
            
            <p className="font-sans-lux text-white/60 text-xs tracking-widest uppercase mb-8 text-center font-light">
              {t.scan}
            </p>

            <button 
              onClick={() => setShowQR(false)}
              className="w-full py-3 rounded-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-colors font-sans-lux text-[10px] tracking-widest uppercase active:scale-95"
            >
              {t.close}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;