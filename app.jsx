const { useCallback, useEffect, useMemo, useState } = React;

const ASSETS = {
  cover: "assets/conference-cover.png",
  details: "assets/invitation-details.png",
};

const EVENT = {
  hospitalAr: "مستشفى الواثق الأهلي",
  hospitalEn: "Al Wathiq Hospital",
  titleAr: "المؤتمر الطبي السنوي",
  titleEn: "Annual Medical Conference 2026",
  edition: "المؤتمر السنوي الأول العلمي في مستشفانا",
  inviteHeadline: "دعوة",
  inviteText:
    "يسر إدارة مستشفى الواثق الأهلي أن تتشرف بدعوتكم لحضور مؤتمرها السنوي الأول العلمي في مستشفانا",
  tagline: "نبض الرعاية... رؤية لصحة المستقبل",
  day: "الجمعة",
  date: "12 / 6 / 2026",
  time: "5:00 مساءً",
  start: new Date("2026-06-12T17:00:00+03:00"),
  end: new Date("2026-06-12T21:00:00+03:00"),
  address: "بغداد - الكرادة - ساحة الواثق",
  phones: ["07755550767", "07855550767"],
  mapsQuery: "مستشفى الواثق الأهلي بغداد الكرادة ساحة الواثق",
  siteUrl: "",
};

EVENT.mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(EVENT.mapsQuery);
EVENT.mapEmbed =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(EVENT.mapsQuery) +
  "&output=embed";

const getSiteUrl = () => EVENT.siteUrl || window.location.href;

const Icon = ({ children, className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const icons = {
  arrow: (
    <Icon>
      <path d="M8 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  ),
  pin: (
    <Icon>
      <path d="M12 21s7-6.7 7-12a7 7 0 1 0-14 0c0 5.3 7 12 7 12z" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.7" />
    </Icon>
  ),
  calendar: (
    <Icon>
      <rect x="4" y="5" width="16" height="16" rx="2.4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </Icon>
  ),
  clock: (
    <Icon>
      <circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7.5V12l3.2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </Icon>
  ),
  phone: (
    <Icon>
      <path
        d="M7.5 4.5l2.2 4.1-1.5 1.5c1.1 2.2 2.9 4 5.1 5.1l1.6-1.5 4.1 2.2-.8 3.1c-.2.8-.9 1.3-1.7 1.2-8-.8-12.9-5.7-13.6-13.6-.1-.8.4-1.5 1.2-1.7l3.2-.8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </Icon>
  ),
  share: (
    <Icon>
      <path d="M8.5 12.7l7-4.1M8.5 15.3l7 4.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="6" cy="14" r="2.7" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="7" r="2.7" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="21" r="2.7" stroke="currentColor" strokeWidth="1.7" />
    </Icon>
  ),
  copy: (
    <Icon>
      <rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M15 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" stroke="currentColor" strokeWidth="1.7" />
    </Icon>
  ),
  pulse: (
    <Icon>
      <path d="M2.7 12h4.1l1.4-5.2 3.1 10.3 2.4-7.1 1.9 4.1h5.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  ),
};

const Toast = ({ message }) => (
  <div className={`toast ${message ? "is-visible" : ""}`}>{message}</div>
);

const useCountdown = (targetDate) => {
  const getRemaining = useCallback(() => {
    const distance = Math.max(0, targetDate.getTime() - Date.now());
    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);
    return { days, hours, minutes, seconds };
  }, [targetDate]);

  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const timer = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(timer);
  }, [getRemaining]);

  return remaining;
};

const MedicalNetwork = () => (
  <svg className="medical-network" viewBox="0 0 900 700" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="networkLine" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#12d7e8" stopOpacity="0.15" />
        <stop offset="55%" stopColor="#e3b35c" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <path className="network-path slow" d="M20 590 C150 520 210 655 340 560 S560 495 700 590 840 535 900 590" />
    <path className="network-path" d="M40 140 C160 60 230 215 330 120 S520 60 610 140 780 210 880 110" />
    <path className="network-path fine" d="M105 500 L190 430 L300 465 L390 385 L510 430 L640 345 L810 395" />
    {[95, 190, 300, 390, 510, 640, 810].map((cx, index) => (
      <circle key={cx} className="network-dot" cx={cx} cy={[500, 430, 465, 385, 430, 345, 395][index]} r="4" />
    ))}
  </svg>
);

const HeartPulseMark = () => (
  <div className="pulse-mark" aria-hidden="true">
    <span className="pulse-ring one" />
    <span className="pulse-ring two" />
    <svg viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="46" fill="rgba(0,38,66,.76)" stroke="rgba(228,179,92,.9)" strokeWidth="3" />
      <path d="M22 62h22l6-24 15 48 10-31 8 17h25" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const EkgLine = ({ className = "" }) => (
  <svg className={`ekg-line ${className}`} viewBox="0 0 780 72" preserveAspectRatio="none" aria-hidden="true">
    <path className="ekg-gold" d="M0 38H224" />
    <path className="ekg-cyan" d="M224 38h39l11-22 18 50 17-40 10 24h40l22-33 27 55 20-33h44l11 17 11-17h44l20 33 27-55 22 33h40l10-24 17 40 18-50 11 22h39" />
    <path className="ekg-gold" d="M556 38H780" />
  </svg>
);

const FloatingParticles = ({ count = 28 }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: -Math.random() * 10,
        duration: 7 + Math.random() * 9,
        size: 2 + Math.random() * 4,
      })),
    [count]
  );

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((item) => (
        <span
          key={item.id}
          style={{
            left: `${item.left}%`,
            width: `${item.size}px`,
            height: `${item.size}px`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

const StartPage = ({ isLeaving }) => (
  <section className={`hero start-page ${isLeaving ? "is-leaving" : ""}`} id="top">
    <img className="hero-blur" src={ASSETS.cover} alt="" aria-hidden="true" />
    <MedicalNetwork />
    <FloatingParticles />
    <div className="transition-gate" aria-hidden="true">
      <span className="gate-line top" />
      <span className="gate-line bottom" />
      <span className="gate-flash" />
    </div>

    <div className="hero-shell">
      <div className="hero-image-stage">
        <img className="hero-poster" src={ASSETS.cover} alt="دعوة المؤتمر الطبي السنوي 2026 لمستشفى الواثق الأهلي" />
        <div className="start-poster-mask" aria-hidden="true">
          <span />
        </div>
        <div className="poster-sheen" aria-hidden="true" />
      </div>

      <div className="hero-copy">
        <h1 className="visually-hidden">{EVENT.hospitalAr} - {EVENT.titleAr}</h1>
        <div className="hero-date-chip">
          <span>{EVENT.day}</span>
          <strong>{EVENT.date}</strong>
          <span>{EVENT.time}</span>
        </div>

        <div className="auto-loader" aria-live="polite">
          <span className="loader-orbit" aria-hidden="true">
            <span />
          </span>
          <strong>تهيئة </strong>
          <small>سيتم فتح الدعوة خلال لحظات</small>
        </div>
      </div>
    </div>

  </section>
);

const Countdown = () => {
  const remaining = useCountdown(EVENT.start);
  const items = [
    ["يوم", remaining.days],
    ["ساعة", remaining.hours],
    ["دقيقة", remaining.minutes],
    ["ثانية", remaining.seconds],
  ];

  return (
    <div className="countdown" aria-label="الوقت المتبقي للمؤتمر">
      {items.map(([label, value]) => (
        <div className="countdown-cell" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

const DetailTile = ({ icon, label, value, note }) => (
  <div className="detail-tile">
    <div className="tile-icon">{icon}</div>
    <span>{label}</span>
    <strong>{value}</strong>
    {note && <small>{note}</small>}
  </div>
);

const InvitationSection = React.forwardRef((props, ref) => (
  <section className="section invitation-section reveal" id="invitation" ref={ref}>
    <div className="section-heading">
      <span>الدعوة الرسمية</span>
      <h2>{EVENT.inviteHeadline}</h2>
      <p>{EVENT.inviteText}</p>
    </div>

    <div className="invitation-layout">
      <figure className="official-poster">
        <img src={ASSETS.details} alt="تفاصيل دعوة مستشفى الواثق الأهلي للمؤتمر العلمي السنوي الأول" />
      </figure>

      <div className="invitation-copy">
        <HeartPulseMark />
        <h3>{EVENT.edition}</h3>
        <p>{EVENT.tagline}</p>

        <div className="detail-grid">
          <DetailTile icon={icons.calendar} label="التاريخ" value={EVENT.date} note={EVENT.day} />
          <DetailTile icon={icons.clock} label="الوقت" value={EVENT.time} />
          <DetailTile icon={icons.pin} label="المكان" value={EVENT.address} />
        </div>

        <EkgLine />

        <div className="action-row">
          <a className="primary-action wide" href={EVENT.mapsUrl} target="_blank" rel="noopener noreferrer">
            {icons.pin}
            <span>اذهب إلى الموقع</span>
          </a>
          <a className="secondary-action wide" href={`tel:${EVENT.phones[0]}`}>
            {icons.phone}
            <span>{EVENT.phones[0]}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
));

const ScheduleSection = () => (
  <section className="section schedule-section reveal">
    <div className="section-heading compact">
      <span>موعد المؤتمر</span>
      <h2>الجمعة 12 حزيران 2026</h2>
    </div>

    <Countdown />

    <div className="timeline">
      {[
        ["الاستقبال", "تهيئة الحضور والضيوف"],
        ["الافتتاح", "كلمة إدارة المستشفى"],
        ["الجلسات العلمية", "محاور طبية ورؤى مستقبلية"],
        ["الختام", "تواصل وتكريم الحضور"],
      ].map(([title, text], index) => (
        <div className="timeline-item" key={title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{title}</strong>
          <p>{text}</p>
        </div>
      ))}
    </div>
  </section>
);

const LocationSection = () => (
  <section className="section location-section reveal" id="location">
    <div className="section-heading">
      <span>الموقع</span>
      <h2>{EVENT.address}</h2>
      <p>{EVENT.hospitalAr} - {EVENT.hospitalEn}</p>
    </div>

    <div className="location-layout">
      <div className="map-panel">
        <iframe
          src={EVENT.mapEmbed}
          width="100%"
          height="360"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="موقع مستشفى الواثق الأهلي"
        />
      </div>

      <div className="contact-panel">
        <DetailTile icon={icons.pin} label="العنوان" value={EVENT.address} note="افتح الخريطة للوصول المباشر" />
        <DetailTile icon={icons.phone} label="الاتصال" value={EVENT.phones.join(" - ")} />
        <a className="primary-action wide" href={EVENT.mapsUrl} target="_blank" rel="noopener noreferrer">
          {icons.pin}
          <span>فتح الموقع على الخريطة</span>
        </a>
      </div>
    </div>
  </section>
);

const formatIcsDate = (date) =>
  date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const buildShareText = () =>
  [
    `${EVENT.hospitalAr}`,
    `${EVENT.titleAr} - ${EVENT.titleEn}`,
    EVENT.inviteText,
    `التاريخ: ${EVENT.day} ${EVENT.date}`,
    `الوقت: ${EVENT.time}`,
    `المكان: ${EVENT.address}`,
    `الموقع: ${EVENT.mapsUrl}`,
  ].join("\n");

const ActionsSection = ({ onToast }) => {
  const downloadCalendar = () => {
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Al Wathiq Hospital//Annual Medical Conference//AR",
      "BEGIN:VEVENT",
      `UID:al-wathiq-medical-conference-2026@alwathiq`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(EVENT.start)}`,
      `DTEND:${formatIcsDate(EVENT.end)}`,
      `SUMMARY:${EVENT.titleAr} - ${EVENT.hospitalAr}`,
      `DESCRIPTION:${EVENT.inviteText}`,
      `LOCATION:${EVENT.address}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ];
    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "al-wathiq-medical-conference-2026.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 800);
    onToast("تم تجهيز ملف التقويم");
  };

  const shareWhatsapp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(buildShareText())}`, "_blank", "noopener,noreferrer");
  };

  const copyLink = async () => {
    const text = getSiteUrl();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const input = document.createElement("textarea");
        input.value = text;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      onToast("تم نسخ رابط الدعوة");
    } catch (error) {
      onToast("تعذر نسخ الرابط");
    }
  };

  return (
    <section className="section actions-section reveal">
      <div className="section-heading compact">
        <span>المشاركة</span>
        <h2>حضوركم يشرفنا</h2>
      </div>

      <div className="action-grid">
        <button className="secondary-action wide" onClick={shareWhatsapp}>
          {icons.share}
          <span>مشاركة واتساب</span>
        </button>
        <button className="secondary-action wide" onClick={downloadCalendar}>
          {icons.calendar}
          <span>إضافة إلى التقويم</span>
        </button>
        <button className="secondary-action wide" onClick={copyLink}>
          {icons.copy}
          <span>نسخ رابط الدعوة</span>
        </button>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="site-footer">
    <EkgLine />
    <p>{EVENT.hospitalAr}</p>
    <strong>{EVENT.titleEn}</strong>
  </footer>
);

const DetailsPage = ({ onBack, onToast }) => (
  <div className="details-page">
    <header className="details-header">
      <button className="back-action" onClick={onBack}>
        {icons.arrow}
        <span>صفحة البداية</span>
      </button>
      <div>
        <span>دعوة رسمية</span>
        <strong>{EVENT.titleAr}</strong>
      </div>
    </header>

    <main className="details-main">
      <InvitationSection />
      <ScheduleSection />
      <LocationSection />
      <ActionsSection onToast={onToast} />
    </main>
    <Footer />
  </div>
);

const App = () => {
  const [started, setStarted] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return ["invitation", "location", "details"].includes(hash);
  });
  const [transitioning, setTransitioning] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (started) return;
    const transitionTimer = window.setTimeout(() => setTransitioning(true), 4700);
    const startTimer = window.setTimeout(() => {
      setStarted(true);
      window.history.replaceState(null, "", "#invitation");
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
    }, 5900);

    return () => {
      window.clearTimeout(transitionTimer);
      window.clearTimeout(startTimer);
    };
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const items = Array.from(document.querySelectorAll(".reveal"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const timer = setTimeout(() => {
      const target = document.getElementById(hash);
      target?.classList.add("is-visible");
      target?.scrollIntoView({ behavior: "auto", block: "start" });
    }, 350);
    return () => clearTimeout(timer);
  }, [started]);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2300);
  }, []);

  const backToStart = () => {
    setStarted(false);
    setTransitioning(false);
    window.history.pushState(null, "", window.location.pathname);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
  };

  return (
    <div className={`site-shell ${started ? "is-details-page" : "is-start-page"}`}>
      {started ? (
        <DetailsPage onBack={backToStart} onToast={showToast} />
      ) : (
        <StartPage isLeaving={transitioning} />
      )}
      <Toast message={toast} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
