import Button from "@/components/ui/Button";
import { WindowsIcon, AppleIcon, LinuxIcon } from "@/components/icons";
import styles from "./download.module.css";

interface DownloadCardsT {
  windowsName: string;
  windowsDetail: string;
  windowsBtn: string;
  macName: string;
  macDetail: string;
  macBtn: string;
  linuxName: string;
  linuxDetail: string;
  linuxBtn: string;
  comingSoon: string;
  comingSoonNote: string;
}

interface Props {
  t: DownloadCardsT;
  lang: string;
}

export default function DownloadCards({ t, lang }: Props) {
  const cards = [
    {
      id: "windows" as const,
      icon: <WindowsIcon size={28} />,
      name: t.windowsName,
      detail: t.windowsDetail,
      btn: t.windowsBtn,
      href: `/api/download/windows?lang=${lang}`,
      available: true,
    },
    {
      id: "mac" as const,
      icon: <AppleIcon size={28} />,
      name: t.macName,
      detail: t.macDetail,
      btn: t.macBtn,
      href: undefined,
      available: false,
    },
    {
      id: "linux" as const,
      icon: <LinuxIcon size={28} />,
      name: t.linuxName,
      detail: t.linuxDetail,
      btn: t.linuxBtn,
      href: undefined,
      available: false,
    },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <div key={card.id} className={styles.card}>
          <div className={styles.iconWrap}>{card.icon}</div>
          <h3 className={styles.osName}>{card.name}</h3>
          <p className={styles.osDetail}>{card.detail}</p>
          <Button
            type="primary"
            size="large"
            href={card.href}
            disabled={!card.available}
            className={styles.cardBtn}
          >
            {card.available ? card.btn : t.comingSoon}
          </Button>
          {!card.available && <p className={styles.comingSoonNote}>{t.comingSoonNote}</p>}
        </div>
      ))}
    </div>
  );
}
