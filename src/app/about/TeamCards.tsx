"use client";

import styles from "./about.module.css";

interface TeamMemberT {
  role: string;
  bio: string;
}

interface Props {
  t: TeamMemberT[];
}

const MEMBER_META = [
  { name: "Mehdi BEN RABIAA",          src: "/profile-pic.webp"    },
  { name: "Salah-Eddine EL MAGUERI",   src: "/salah-magueri.webp"  },
  { name: "Saumya Shah",               src: ""                     },
  { name: "Raphaël Thomas",            src: ""                     },
];

export default function TeamCards({ t }: Props) {
  return (
    <div className={styles.grid}>
      {MEMBER_META.map((meta, i) => {
        const member = t[i];
        if (!member) return null;
        return (
          <div key={meta.name} className={styles.card}>
            {meta.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={meta.src}
                alt={meta.name}
                width={80}
                height={80}
                style={{ flexShrink: 0, width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  flexShrink: 0,
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f0f0f0",
                  color: "#888",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {meta.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
            )}
            <div>
              <p className={styles.name}>{meta.name}</p>
              <p className={styles.role}>{member.role}</p>
              {member.bio.split("\n\n").map((para, pi) => (
                <p key={pi} className={styles.bio}>{para}</p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
