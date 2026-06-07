const {
  useCallback,
  useEffect,
  useMemo,
  useState
} = React;
const ASSETS = {
  cover: "assets/conference-cover.png",
  details: "assets/invitation-details.png"
};
const EVENT = {
  hospitalAr: "مستشفى الواثق الأهلي",
  hospitalEn: "Al Wathiq Hospital",
  titleAr: "المؤتمر الطبي السنوي",
  titleEn: "Annual Medical Conference 2026",
  edition: "المؤتمر السنوي الأول العلمي في مستشفانا",
  inviteHeadline: "دعوة",
  inviteText: "يسر إدارة مستشفى الواثق الأهلي أن تتشرف بدعوتكم لحضور مؤتمرها السنوي الأول العلمي في مستشفانا",
  tagline: "نبض الرعاية... رؤية لصحة المستقبل",
  day: "الجمعة",
  date: "12 / 6 / 2026",
  time: "5:00 مساءً",
  start: new Date("2026-06-12T17:00:00+03:00"),
  end: new Date("2026-06-12T21:00:00+03:00"),
  address: "بغداد - الكرادة - ساحة الواثق",
  phones: ["07755550767", "07855550767"],
  mapsQuery: "مستشفى الواثق الأهلي بغداد الكرادة ساحة الواثق",
  siteUrl: ""
};
EVENT.mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(EVENT.mapsQuery);
EVENT.mapEmbed = "https://www.google.com/maps?q=" + encodeURIComponent(EVENT.mapsQuery) + "&output=embed";
const getSiteUrl = () => EVENT.siteUrl || window.location.href;
const Icon = ({
  children,
  className = ""
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  viewBox: "0 0 24 24",
  width: "22",
  height: "22",
  fill: "none",
  "aria-hidden": "true"
}, children);
const icons = {
  arrow: /*#__PURE__*/React.createElement(Icon, null, /*#__PURE__*/React.createElement("path", {
    d: "M8 5l7 7-7 7",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  pin: /*#__PURE__*/React.createElement(Icon, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 21s7-6.7 7-12a7 7 0 1 0-14 0c0 5.3 7 12 7 12z",
    stroke: "currentColor",
    strokeWidth: "1.7"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "9",
    r: "2.4",
    stroke: "currentColor",
    strokeWidth: "1.7"
  })),
  calendar: /*#__PURE__*/React.createElement(Icon, null, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "5",
    width: "16",
    height: "16",
    rx: "2.4",
    stroke: "currentColor",
    strokeWidth: "1.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 3v4M16 3v4M4 10h16",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round"
  })),
  clock: /*#__PURE__*/React.createElement(Icon, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "8.4",
    stroke: "currentColor",
    strokeWidth: "1.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7.5V12l3.2 2",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round"
  })),
  phone: /*#__PURE__*/React.createElement(Icon, null, /*#__PURE__*/React.createElement("path", {
    d: "M7.5 4.5l2.2 4.1-1.5 1.5c1.1 2.2 2.9 4 5.1 5.1l1.6-1.5 4.1 2.2-.8 3.1c-.2.8-.9 1.3-1.7 1.2-8-.8-12.9-5.7-13.6-13.6-.1-.8.4-1.5 1.2-1.7l3.2-.8z",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinejoin: "round"
  })),
  share: /*#__PURE__*/React.createElement(Icon, null, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 12.7l7-4.1M8.5 15.3l7 4.1",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "14",
    r: "2.7",
    stroke: "currentColor",
    strokeWidth: "1.7"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "7",
    r: "2.7",
    stroke: "currentColor",
    strokeWidth: "1.7"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "21",
    r: "2.7",
    stroke: "currentColor",
    strokeWidth: "1.7"
  })),
  copy: /*#__PURE__*/React.createElement(Icon, null, /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "8",
    width: "11",
    height: "11",
    rx: "2",
    stroke: "currentColor",
    strokeWidth: "1.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2",
    stroke: "currentColor",
    strokeWidth: "1.7"
  })),
  pulse: /*#__PURE__*/React.createElement(Icon, null, /*#__PURE__*/React.createElement("path", {
    d: "M2.7 12h4.1l1.4-5.2 3.1 10.3 2.4-7.1 1.9 4.1h5.7",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))
};
const Toast = ({
  message
}) => /*#__PURE__*/React.createElement("div", {
  className: `toast ${message ? "is-visible" : ""}`
}, message);
const useCountdown = targetDate => {
  const getRemaining = useCallback(() => {
    const distance = Math.max(0, targetDate.getTime() - Date.now());
    const days = Math.floor(distance / 86400000);
    const hours = Math.floor(distance % 86400000 / 3600000);
    const minutes = Math.floor(distance % 3600000 / 60000);
    const seconds = Math.floor(distance % 60000 / 1000);
    return {
      days,
      hours,
      minutes,
      seconds
    };
  }, [targetDate]);
  const [remaining, setRemaining] = useState(getRemaining);
  useEffect(() => {
    const timer = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(timer);
  }, [getRemaining]);
  return remaining;
};
const MedicalNetwork = () => /*#__PURE__*/React.createElement("svg", {
  className: "medical-network",
  viewBox: "0 0 900 700",
  preserveAspectRatio: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
  id: "networkLine",
  x1: "0",
  x2: "1",
  y1: "0",
  y2: "1"
}, /*#__PURE__*/React.createElement("stop", {
  offset: "0%",
  stopColor: "#12d7e8",
  stopOpacity: "0.15"
}), /*#__PURE__*/React.createElement("stop", {
  offset: "55%",
  stopColor: "#e3b35c",
  stopOpacity: "0.5"
}), /*#__PURE__*/React.createElement("stop", {
  offset: "100%",
  stopColor: "#ffffff",
  stopOpacity: "0.1"
}))), /*#__PURE__*/React.createElement("path", {
  className: "network-path slow",
  d: "M20 590 C150 520 210 655 340 560 S560 495 700 590 840 535 900 590"
}), /*#__PURE__*/React.createElement("path", {
  className: "network-path",
  d: "M40 140 C160 60 230 215 330 120 S520 60 610 140 780 210 880 110"
}), /*#__PURE__*/React.createElement("path", {
  className: "network-path fine",
  d: "M105 500 L190 430 L300 465 L390 385 L510 430 L640 345 L810 395"
}), [95, 190, 300, 390, 510, 640, 810].map((cx, index) => /*#__PURE__*/React.createElement("circle", {
  key: cx,
  className: "network-dot",
  cx: cx,
  cy: [500, 430, 465, 385, 430, 345, 395][index],
  r: "4"
})));
const HeartPulseMark = () => /*#__PURE__*/React.createElement("div", {
  className: "pulse-mark",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("span", {
  className: "pulse-ring one"
}), /*#__PURE__*/React.createElement("span", {
  className: "pulse-ring two"
}), /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 120 120",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "60",
  cy: "60",
  r: "46",
  fill: "rgba(0,38,66,.76)",
  stroke: "rgba(228,179,92,.9)",
  strokeWidth: "3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M22 62h22l6-24 15 48 10-31 8 17h25",
  stroke: "#ffffff",
  strokeWidth: "5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
})));
const EkgLine = ({
  className = ""
}) => /*#__PURE__*/React.createElement("svg", {
  className: `ekg-line ${className}`,
  viewBox: "0 0 780 72",
  preserveAspectRatio: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  className: "ekg-gold",
  d: "M0 38H224"
}), /*#__PURE__*/React.createElement("path", {
  className: "ekg-cyan",
  d: "M224 38h39l11-22 18 50 17-40 10 24h40l22-33 27 55 20-33h44l11 17 11-17h44l20 33 27-55 22 33h40l10-24 17 40 18-50 11 22h39"
}), /*#__PURE__*/React.createElement("path", {
  className: "ekg-gold",
  d: "M556 38H780"
}));
const FloatingParticles = ({
  count = 28
}) => {
  const particles = useMemo(() => Array.from({
    length: count
  }, (_, index) => ({
    id: index,
    left: Math.random() * 100,
    delay: -Math.random() * 10,
    duration: 7 + Math.random() * 9,
    size: 2 + Math.random() * 4
  })), [count]);
  return /*#__PURE__*/React.createElement("div", {
    className: "particles",
    "aria-hidden": "true"
  }, particles.map(item => /*#__PURE__*/React.createElement("span", {
    key: item.id,
    style: {
      left: `${item.left}%`,
      width: `${item.size}px`,
      height: `${item.size}px`,
      animationDelay: `${item.delay}s`,
      animationDuration: `${item.duration}s`
    }
  })));
};
const StartPage = ({
  isLeaving
}) => /*#__PURE__*/React.createElement("section", {
  className: `hero start-page ${isLeaving ? "is-leaving" : ""}`,
  id: "top"
}, /*#__PURE__*/React.createElement("img", {
  className: "hero-blur",
  src: ASSETS.cover,
  alt: "",
  "aria-hidden": "true"
}), /*#__PURE__*/React.createElement(MedicalNetwork, null), /*#__PURE__*/React.createElement(FloatingParticles, null), /*#__PURE__*/React.createElement("div", {
  className: "transition-gate",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("span", {
  className: "gate-line top"
}), /*#__PURE__*/React.createElement("span", {
  className: "gate-line bottom"
}), /*#__PURE__*/React.createElement("span", {
  className: "gate-flash"
})), /*#__PURE__*/React.createElement("div", {
  className: "hero-shell"
}, /*#__PURE__*/React.createElement("div", {
  className: "hero-image-stage"
}, /*#__PURE__*/React.createElement("img", {
  className: "hero-poster",
  src: ASSETS.cover,
  alt: "\u062F\u0639\u0648\u0629 \u0627\u0644\u0645\u0624\u062A\u0645\u0631 \u0627\u0644\u0637\u0628\u064A \u0627\u0644\u0633\u0646\u0648\u064A 2026 \u0644\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u0648\u0627\u062B\u0642 \u0627\u0644\u0623\u0647\u0644\u064A"
}), /*#__PURE__*/React.createElement("div", {
  className: "start-poster-mask",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("div", {
  className: "poster-sheen",
  "aria-hidden": "true"
})), /*#__PURE__*/React.createElement("div", {
  className: "hero-copy"
}, /*#__PURE__*/React.createElement("h1", {
  className: "visually-hidden"
}, EVENT.hospitalAr, " - ", EVENT.titleAr), /*#__PURE__*/React.createElement("div", {
  className: "hero-date-chip"
}, /*#__PURE__*/React.createElement("span", null, EVENT.day), /*#__PURE__*/React.createElement("strong", null, EVENT.date), /*#__PURE__*/React.createElement("span", null, EVENT.time)), /*#__PURE__*/React.createElement("div", {
  className: "auto-loader",
  "aria-live": "polite"
}, /*#__PURE__*/React.createElement("span", {
  className: "loader-orbit",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("strong", null, "\u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u062F\u0639\u0648\u0629 \u0627\u0644\u0631\u0633\u0645\u064A\u0629"), /*#__PURE__*/React.createElement("small", null, "\u0633\u064A\u062A\u0645 \u0641\u062A\u062D \u0627\u0644\u062F\u0639\u0648\u0629 \u062E\u0644\u0627\u0644 \u0644\u062D\u0638\u0627\u062A")))));
const Countdown = () => {
  const remaining = useCountdown(EVENT.start);
  const items = [["يوم", remaining.days], ["ساعة", remaining.hours], ["دقيقة", remaining.minutes], ["ثانية", remaining.seconds]];
  return /*#__PURE__*/React.createElement("div", {
    className: "countdown",
    "aria-label": "\u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u062A\u0628\u0642\u064A \u0644\u0644\u0645\u0624\u062A\u0645\u0631"
  }, items.map(([label, value]) => /*#__PURE__*/React.createElement("div", {
    className: "countdown-cell",
    key: label
  }, /*#__PURE__*/React.createElement("strong", null, String(value).padStart(2, "0")), /*#__PURE__*/React.createElement("span", null, label))));
};
const DetailTile = ({
  icon,
  label,
  value,
  note
}) => /*#__PURE__*/React.createElement("div", {
  className: "detail-tile"
}, /*#__PURE__*/React.createElement("div", {
  className: "tile-icon"
}, icon), /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("strong", null, value), note && /*#__PURE__*/React.createElement("small", null, note));
const InvitationSection = React.forwardRef((props, ref) => /*#__PURE__*/React.createElement("section", {
  className: "section invitation-section reveal",
  id: "invitation",
  ref: ref
}, /*#__PURE__*/React.createElement("div", {
  className: "section-heading"
}, /*#__PURE__*/React.createElement("span", null, "\u0627\u0644\u062F\u0639\u0648\u0629 \u0627\u0644\u0631\u0633\u0645\u064A\u0629"), /*#__PURE__*/React.createElement("h2", null, EVENT.inviteHeadline), /*#__PURE__*/React.createElement("p", null, EVENT.inviteText)), /*#__PURE__*/React.createElement("div", {
  className: "invitation-layout"
}, /*#__PURE__*/React.createElement("figure", {
  className: "official-poster"
}, /*#__PURE__*/React.createElement("img", {
  src: ASSETS.details,
  alt: "\u062A\u0641\u0627\u0635\u064A\u0644 \u062F\u0639\u0648\u0629 \u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u0648\u0627\u062B\u0642 \u0627\u0644\u0623\u0647\u0644\u064A \u0644\u0644\u0645\u0624\u062A\u0645\u0631 \u0627\u0644\u0639\u0644\u0645\u064A \u0627\u0644\u0633\u0646\u0648\u064A \u0627\u0644\u0623\u0648\u0644"
})), /*#__PURE__*/React.createElement("div", {
  className: "invitation-copy"
}, /*#__PURE__*/React.createElement(HeartPulseMark, null), /*#__PURE__*/React.createElement("h3", null, EVENT.edition), /*#__PURE__*/React.createElement("p", null, EVENT.tagline), /*#__PURE__*/React.createElement("div", {
  className: "detail-grid"
}, /*#__PURE__*/React.createElement(DetailTile, {
  icon: icons.calendar,
  label: "\u0627\u0644\u062A\u0627\u0631\u064A\u062E",
  value: EVENT.date,
  note: EVENT.day
}), /*#__PURE__*/React.createElement(DetailTile, {
  icon: icons.clock,
  label: "\u0627\u0644\u0648\u0642\u062A",
  value: EVENT.time
}), /*#__PURE__*/React.createElement(DetailTile, {
  icon: icons.pin,
  label: "\u0627\u0644\u0645\u0643\u0627\u0646",
  value: EVENT.address
})), /*#__PURE__*/React.createElement(EkgLine, null), /*#__PURE__*/React.createElement("div", {
  className: "action-row"
}, /*#__PURE__*/React.createElement("a", {
  className: "primary-action wide",
  href: EVENT.mapsUrl,
  target: "_blank",
  rel: "noopener noreferrer"
}, icons.pin, /*#__PURE__*/React.createElement("span", null, "\u0627\u0630\u0647\u0628 \u0625\u0644\u0649 \u0627\u0644\u0645\u0648\u0642\u0639")), /*#__PURE__*/React.createElement("a", {
  className: "secondary-action wide",
  href: `tel:${EVENT.phones[0]}`
}, icons.phone, /*#__PURE__*/React.createElement("span", null, EVENT.phones[0])))))));
const ScheduleSection = () => /*#__PURE__*/React.createElement("section", {
  className: "section schedule-section reveal"
}, /*#__PURE__*/React.createElement("div", {
  className: "section-heading compact"
}, /*#__PURE__*/React.createElement("span", null, "\u0645\u0648\u0639\u062F \u0627\u0644\u0645\u0624\u062A\u0645\u0631"), /*#__PURE__*/React.createElement("h2", null, "\u0627\u0644\u062C\u0645\u0639\u0629 12 \u062D\u0632\u064A\u0631\u0627\u0646 2026")), /*#__PURE__*/React.createElement(Countdown, null), /*#__PURE__*/React.createElement("div", {
  className: "timeline"
}, [["الاستقبال", "تهيئة الحضور والضيوف"], ["الافتتاح", "كلمة إدارة المستشفى"], ["الجلسات العلمية", "محاور طبية ورؤى مستقبلية"], ["الختام", "تواصل وتكريم الحضور"]].map(([title, text], index) => /*#__PURE__*/React.createElement("div", {
  className: "timeline-item",
  key: title
}, /*#__PURE__*/React.createElement("span", null, String(index + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("strong", null, title), /*#__PURE__*/React.createElement("p", null, text)))));
const LocationSection = () => /*#__PURE__*/React.createElement("section", {
  className: "section location-section reveal",
  id: "location"
}, /*#__PURE__*/React.createElement("div", {
  className: "section-heading"
}, /*#__PURE__*/React.createElement("span", null, "\u0627\u0644\u0645\u0648\u0642\u0639"), /*#__PURE__*/React.createElement("h2", null, EVENT.address), /*#__PURE__*/React.createElement("p", null, EVENT.hospitalAr, " - ", EVENT.hospitalEn)), /*#__PURE__*/React.createElement("div", {
  className: "location-layout"
}, /*#__PURE__*/React.createElement("div", {
  className: "map-panel"
}, /*#__PURE__*/React.createElement("iframe", {
  src: EVENT.mapEmbed,
  width: "100%",
  height: "360",
  loading: "lazy",
  referrerPolicy: "no-referrer-when-downgrade",
  title: "\u0645\u0648\u0642\u0639 \u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u0648\u0627\u062B\u0642 \u0627\u0644\u0623\u0647\u0644\u064A"
})), /*#__PURE__*/React.createElement("div", {
  className: "contact-panel"
}, /*#__PURE__*/React.createElement(DetailTile, {
  icon: icons.pin,
  label: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646",
  value: EVENT.address,
  note: "\u0627\u0641\u062A\u062D \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631"
}), /*#__PURE__*/React.createElement(DetailTile, {
  icon: icons.phone,
  label: "\u0627\u0644\u0627\u062A\u0635\u0627\u0644",
  value: EVENT.phones.join(" - ")
}), /*#__PURE__*/React.createElement("a", {
  className: "primary-action wide",
  href: EVENT.mapsUrl,
  target: "_blank",
  rel: "noopener noreferrer"
}, icons.pin, /*#__PURE__*/React.createElement("span", null, "\u0641\u062A\u062D \u0627\u0644\u0645\u0648\u0642\u0639 \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629")))));
const formatIcsDate = date => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const buildShareText = () => [`${EVENT.hospitalAr}`, `${EVENT.titleAr} - ${EVENT.titleEn}`, EVENT.inviteText, `التاريخ: ${EVENT.day} ${EVENT.date}`, `الوقت: ${EVENT.time}`, `المكان: ${EVENT.address}`, `الموقع: ${EVENT.mapsUrl}`].join("\n");
const ActionsSection = ({
  onToast
}) => {
  const downloadCalendar = () => {
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Al Wathiq Hospital//Annual Medical Conference//AR", "BEGIN:VEVENT", `UID:al-wathiq-medical-conference-2026@alwathiq`, `DTSTAMP:${formatIcsDate(new Date())}`, `DTSTART:${formatIcsDate(EVENT.start)}`, `DTEND:${formatIcsDate(EVENT.end)}`, `SUMMARY:${EVENT.titleAr} - ${EVENT.hospitalAr}`, `DESCRIPTION:${EVENT.inviteText}`, `LOCATION:${EVENT.address}`, "END:VEVENT", "END:VCALENDAR"];
    const blob = new Blob([lines.join("\r\n")], {
      type: "text/calendar;charset=utf-8"
    });
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
  return /*#__PURE__*/React.createElement("section", {
    className: "section actions-section reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-heading compact"
  }, /*#__PURE__*/React.createElement("span", null, "\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0629"), /*#__PURE__*/React.createElement("h2", null, "\u062D\u0636\u0648\u0631\u0643\u0645 \u064A\u0634\u0631\u0641\u0646\u0627")), /*#__PURE__*/React.createElement("div", {
    className: "action-grid"
  }, /*#__PURE__*/React.createElement("button", {
    className: "secondary-action wide",
    onClick: shareWhatsapp
  }, icons.share, /*#__PURE__*/React.createElement("span", null, "\u0645\u0634\u0627\u0631\u0643\u0629 \u0648\u0627\u062A\u0633\u0627\u0628")), /*#__PURE__*/React.createElement("button", {
    className: "secondary-action wide",
    onClick: downloadCalendar
  }, icons.calendar, /*#__PURE__*/React.createElement("span", null, "\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0627\u0644\u062A\u0642\u0648\u064A\u0645")), /*#__PURE__*/React.createElement("button", {
    className: "secondary-action wide",
    onClick: copyLink
  }, icons.copy, /*#__PURE__*/React.createElement("span", null, "\u0646\u0633\u062E \u0631\u0627\u0628\u0637 \u0627\u0644\u062F\u0639\u0648\u0629"))));
};
const Footer = () => /*#__PURE__*/React.createElement("footer", {
  className: "site-footer"
}, /*#__PURE__*/React.createElement(EkgLine, null), /*#__PURE__*/React.createElement("p", null, EVENT.hospitalAr), /*#__PURE__*/React.createElement("strong", null, EVENT.titleEn));
const DetailsPage = ({
  onBack,
  onToast
}) => /*#__PURE__*/React.createElement("div", {
  className: "details-page"
}, /*#__PURE__*/React.createElement("header", {
  className: "details-header"
}, /*#__PURE__*/React.createElement("button", {
  className: "back-action",
  onClick: onBack
}, icons.arrow, /*#__PURE__*/React.createElement("span", null, "\u0635\u0641\u062D\u0629 \u0627\u0644\u0628\u062F\u0627\u064A\u0629")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "\u062F\u0639\u0648\u0629 \u0631\u0633\u0645\u064A\u0629"), /*#__PURE__*/React.createElement("strong", null, EVENT.titleAr))), /*#__PURE__*/React.createElement("main", {
  className: "details-main"
}, /*#__PURE__*/React.createElement(InvitationSection, null), /*#__PURE__*/React.createElement(ScheduleSection, null), /*#__PURE__*/React.createElement(LocationSection, null), /*#__PURE__*/React.createElement(ActionsSection, {
  onToast: onToast
})), /*#__PURE__*/React.createElement(Footer, null));
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
      window.setTimeout(() => window.scrollTo({
        top: 0,
        behavior: "auto"
      }), 0);
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
      items.forEach(item => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const timer = setTimeout(() => {
      const target = document.getElementById(hash);
      target?.classList.add("is-visible");
      target?.scrollIntoView({
        behavior: "auto",
        block: "start"
      });
    }, 350);
    return () => clearTimeout(timer);
  }, [started]);
  const showToast = useCallback(message => {
    setToast(message);
    setTimeout(() => setToast(""), 2300);
  }, []);
  const backToStart = () => {
    setStarted(false);
    setTransitioning(false);
    window.history.pushState(null, "", window.location.pathname);
    window.setTimeout(() => window.scrollTo({
      top: 0,
      behavior: "auto"
    }), 0);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `site-shell ${started ? "is-details-page" : "is-start-page"}`
  }, started ? /*#__PURE__*/React.createElement(DetailsPage, {
    onBack: backToStart,
    onToast: showToast
  }) : /*#__PURE__*/React.createElement(StartPage, {
    isLeaving: transitioning
  }), /*#__PURE__*/React.createElement(Toast, {
    message: toast
  }));
};
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
