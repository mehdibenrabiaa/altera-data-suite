"use client";

import { LinkedinFilled } from "@ant-design/icons";
import { Avatar } from "antd";
import styles from "./about.module.css";

interface TeamMemberT {
  role: string;
  bio: string;
}

interface Props {
  t: TeamMemberT[];
}

const MEMBER_META = [
  { name: "Mehdi BENRABIAA", src: "/Profile Pic.webp",  linkedin: "https://www.linkedin.com/in/mehdi-benrabiaa-7551a217b/?skipRedirect=true" },
  { name: "Rayan CH",         src: null,                linkedin: null },
];

export default function TeamCards({ t }: Props) {
  return (
    <div className={styles.grid}>
      {MEMBER_META.map((meta, i) => {
        const member = t[i];
        return (
          <div key={meta.name} className={styles.card}>
            {meta.src ? (
              <Avatar size={80} src={meta.src} alt={meta.name} style={{ flexShrink: 0 }} />
            ) : (
              <Avatar size={80} style={{ flexShrink: 0, background: "#f0f0f0", color: "#888", fontSize: 18, fontWeight: 600 }}>
                {meta.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </Avatar>
            )}
            <div>
              <p className={styles.name}>{meta.name}</p>
              <p className={styles.role}>{member.role}</p>
              <p className={styles.bio}>{member.bio}</p>
              {meta.linkedin && (
                <a href={meta.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkedIn}>
                  <LinkedinFilled style={{ fontSize: 16 }} />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
