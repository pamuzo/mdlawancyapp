import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailValues {
  to: string;
  subject: string;
  text?: string;
  type?: "verification" | "reset-password";
  user?: {
    name?: string | null;
    email: string;
  };
  url?: string;
}

// export async function SendEmail({ to, subject, text, html }: SendEmailValues) {
//   await resend.emails.send({
//     from: "MDLawancy@lawancy.com",
//     to,
//     subject,
//     text,
//     html,
//   });
// }

export async function SendEmail({
  to,
  subject,
  text,
  type,
  user,
  url,
}: SendEmailValues) {
  const userName = user?.name || "there";

  let html = "";

  if (type === "verification") {
    html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Verify your email</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background: #f4f6f8;
          font-family: Arial, Helvetica, sans-serif;
        "
      >

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="padding: 40px 15px;"
        >
          <tr>
            <td align="center">

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width: 600px;
                  background: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                "
              >

                <!-- HEADER -->
                <tr>
                  <td
                    align="center"
                    style="
                      padding: 35px 25px;
                      border-bottom: 1px solid #eeeeee;
                    "
                  >

                    <img
                      src="https://www.lawancy.com/images/logo.svg"
                      alt="MD Lawancy Limited"
                      width="85"
                      style="
                        display: block;
                        margin: 0 auto 15px;
                      "
                    />

                    <h2
                      style="
                        margin: 0;
                        color: #102f52;
                        font-size: 22px;
                      "
                    >
                      MD LAWANCY LIMITED
                    </h2>

                    <p
                      style="
                        margin: 7px 0 0;
                        color: #777777;
                        font-size: 11px;
                        letter-spacing: 1px;
                      "
                    >
                      BRANDING • PRINTING • GRAPHICS • TECHNOLOGY
                    </p>

                  </td>
                </tr>

                <!-- CONTENT -->
                <tr>
                  <td style="padding: 40px 35px;">

                    <h1
                      style="
                        margin: 0 0 20px;
                        color: #102f52;
                        font-size: 28px;
                        text-align: center;
                      "
                    >
                      Verify Your Email
                    </h1>

                    <p
                      style="
                        margin: 0 0 18px;
                        color: #555555;
                        font-size: 16px;
                        line-height: 1.7;
                      "
                    >
                      Hello ${userName},
                    </p>

                    <p
                      style="
                        margin: 0 0 20px;
                        color: #555555;
                        font-size: 16px;
                        line-height: 1.7;
                      "
                    >
                      Welcome to
                      <strong style="color: #102f52;">
                        MD Lawancy Limited
                      </strong>.
                    </p>

                    <p
                      style="
                        margin: 0 0 30px;
                        color: #555555;
                        font-size: 16px;
                        line-height: 1.7;
                      "
                    >
                      Thank you for creating an account with us.
                      Please verify your email address to activate
                      your account and get started.
                    </p>

                    <!-- BUTTON -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tr>
                        <td align="center">

                          <a
                            href="${url}"
                            target="_blank"
                            style="
                              display: inline-block;
                              background: #102f52;
                              color: #ffffff;
                              text-decoration: none;
                              padding: 15px 32px;
                              border-radius: 7px;
                              font-size: 16px;
                              font-weight: bold;
                            "
                          >
                            Verify My Email
                          </a>

                        </td>
                      </tr>
                    </table>

                    <p
                      style="
                        margin: 28px 0 0;
                        color: #777777;
                        font-size: 13px;
                        line-height: 1.6;
                        text-align: center;
                      "
                    >
                      This verification link will expire in
                      <strong>1 hour</strong>.
                    </p>

                    <!-- FALLBACK LINK -->
                    <div
                      style="
                        margin-top: 30px;
                        padding: 15px;
                        background: #f6f7f9;
                        border-radius: 6px;
                      "
                    >

                      <p
                        style="
                          margin: 0 0 8px;
                          color: #777777;
                          font-size: 12px;
                        "
                      >
                        If the button does not work, copy and paste
                        this link into your browser:
                      </p>

                      <a
                        href="${url}"
                        target="_blank"
                        style="
                          color: #102f52;
                          font-size: 12px;
                          word-break: break-all;
                        "
                      >
                        ${url}
                      </a>

                    </div>

                    <p
                      style="
                        margin: 30px 0 0;
                        color: #888888;
                        font-size: 13px;
                        line-height: 1.6;
                      "
                    >
                      If you did not create an account with
                      MD Lawancy Limited, you can safely ignore
                      this email.
                    </p>

                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td
                    align="center"
                    style="
                      padding: 25px;
                      background: #102f52;
                    "
                  >

                    <p
                      style="
                        margin: 0 0 8px;
                        color: #ffffff;
                        font-size: 14px;
                        font-weight: bold;
                      "
                    >
                      MD LAWANCY LIMITED
                    </p>

                    <p
                      style="
                        margin: 0 0 10px;
                        color: #d7e0ea;
                        font-size: 12px;
                      "
                    >
                      Branding • Printing • Graphics • Technology
                    </p>

                    <p
                      style="
                        margin: 0;
                        color: #aebccc;
                        font-size: 11px;
                      "
                    >
                      © ${new Date().getFullYear()}
                      MD Lawancy Limited. All rights reserved.
                    </p>

                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
      </html>
    `;
  }

  if (type === "reset-password") {
    html = `
      <!DOCTYPE html>
      <html>
      <body
        style="
          margin: 0;
          padding: 40px 15px;
          background: #f4f6f8;
          font-family: Arial, Helvetica, sans-serif;
        "
      >

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
        >
          <tr>
            <td align="center">

              <table
                width="100%"
                style="
                  max-width: 600px;
                  background: #ffffff;
                  border-radius: 12px;
                  padding: 40px;
                "
              >

                <tr>
                  <td align="center">

                    <img
                      src="https://www.lawancy.com/images/logo.svg"
                      alt="MD Lawancy Limited"
                      width="85"
                    />

                    <h2 style="color: #102f52;">
                      MD LAWANCY LIMITED
                    </h2>

                    <h1 style="color: #102f52;">
                      Reset Your Password
                    </h1>

                    <p
                      style="
                        color: #555555;
                        font-size: 16px;
                        line-height: 1.6;
                      "
                    >
                      Hello ${userName},
                    </p>

                    <p
                      style="
                        color: #555555;
                        font-size: 16px;
                        line-height: 1.6;
                      "
                    >
                      We received a request to reset your
                      MD Lawancy account password.
                    </p>

                    <a
                      href="${url}"
                      target="_blank"
                      style="
                        display: inline-block;
                        margin: 20px 0;
                        padding: 15px 30px;
                        background: #102f52;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 7px;
                        font-weight: bold;
                      "
                    >
                      Reset My Password
                    </a>

                    <p
                      style="
                        color: #888888;
                        font-size: 13px;
                        line-height: 1.6;
                      "
                    >
                      If you did not request a password reset,
                      you can safely ignore this email.
                    </p>

                    <p
                      style="
                        color: #888888;
                        font-size: 12px;
                        margin-top: 30px;
                      "
                    >
                      © ${new Date().getFullYear()}
                      MD Lawancy Limited. All rights reserved.
                    </p>

                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
      </html>
    `;
  }

  const result = await resend.emails.send({
    from: "MD Lawancy <account@lawancy.com>",
    to,
    subject,
    html,
    text,
  });

  if (result.error) {
    console.error("Resend error:", result.error);
    throw new Error(result.error.message);
  }

  return result;
}
