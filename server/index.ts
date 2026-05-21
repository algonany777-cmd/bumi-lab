import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON bodies
  app.use(express.json());

  // ── Contact form API ──────────────────────────────────────────────────────
  app.post("/api/contact", async (req, res) => {
    const { name, email, type, message } = req.body as {
      name?: string;
      email?: string;
      type?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      res.status(400).json({ ok: false, error: "Missing required fields" });
      return;
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_TO_EMAIL || "algonany@naver.com";

    if (!smtpUser || !smtpPass) {
      console.error("[contact] SMTP credentials not configured");
      res.status(500).json({ ok: false, error: "Mail server not configured" });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.naver.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const inquiryTypeMap: Record<string, string> = {
      product: "제품 문의",
      distribution: "유통/입점 문의",
      partnership: "파트너십 문의",
      press: "언론/PR 문의",
      other: "기타",
    };
    const typeLabel = type ? (inquiryTypeMap[type] ?? type) : "미선택";

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #0D3D2E; border-bottom: 2px solid #A8C5AC; padding-bottom: 12px;">
          [BUMI LAB] 새 문의가 접수되었습니다
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 10px; background: #e8f0e9; font-weight: bold; width: 120px; border-radius: 4px;">이름</td>
            <td style="padding: 10px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background: #e8f0e9; font-weight: bold; border-radius: 4px;">이메일</td>
            <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; background: #e8f0e9; font-weight: bold; border-radius: 4px;">문의 유형</td>
            <td style="padding: 10px;">${typeLabel}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background: #e8f0e9; font-weight: bold; border-radius: 4px; vertical-align: top;">문의 내용</td>
            <td style="padding: 10px; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
          </tr>
        </table>
        <p style="margin-top: 24px; color: #888; font-size: 12px;">
          이 메일은 bumilab.biz 문의 폼에서 자동 발송되었습니다.
        </p>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: `"BUMI LAB 문의" <${smtpUser}>`,
        to: toEmail,
        replyTo: email,
        subject: `[BUMI LAB 문의] ${name}님의 ${typeLabel}`,
        html: htmlBody,
      });

      res.json({ ok: true });
    } catch (err) {
      console.error("[contact] sendMail error:", err);
      res.status(500).json({ ok: false, error: "Failed to send email" });
    }
  });

  // ── Static files ──────────────────────────────────────────────────────────
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
