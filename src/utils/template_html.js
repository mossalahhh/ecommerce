export const confirmationTemp = (link) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Sofia+Sans:wght@700&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet" type="text/css" />
</head>
<body style="margin:0;padding:0;background-color:#FFFFFF;font-family:Open Sans,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color:#FFFFFF;">
    <tr>
      <td align="center" style="padding:40px;">
        <table width="600" cellpadding="0" cellspacing="0" style="border:1px solid #EBEBEB;border-radius:3px;background-color:#FFFFFF;padding:40px;">
          <tr>
            <td>
              <h1 style="font-family:Montserrat,Arial,sans-serif;font-size:24px;font-weight:700;color:#141414;text-align:left;margin-bottom:20px;">
                Confirm your account
              </h1>
              <p style="font-size:15px;line-height:22px;color:#141414;text-align:left;margin-bottom:30px;">
                Please click the button below to confirm your email address and finish setting up your account. 
                This link is valid for 48 hours.
              </p>
              <div style="text-align:left;margin-bottom:40px;">
                <a href="${link}" 
                   style="display:inline-block;background-color:#0666EB;color:#FFFFFF;font-weight:700;
                          font-size:16px;line-height:34px;text-align:center;padding:10px 23px;
                          border-radius:40px;text-decoration:none;font-family:Sofia Sans,Arial,sans-serif;">
                  Confirm
                </a>
              </div>
              <hr style="border:none;border-top:1px solid #DFE1E4;margin:30px 0;" />
              <p style="font-size:14px;color:#222222;font-weight:600;">Stroopwafel</p>
              <p style="font-size:14px;color:#B4BECC;">Unsubscribe from these emails</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const resetPasswordTemp = (code) => `

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Reset Password</title>
</head>
<body style="margin:0;padding:0;background-color:#F0F0F0;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="background:#F0F0F0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#FFFFFF;border-radius:8px;">
          <tr>
            <td align="center" style="padding:40px 20px;">
              <h1 style="font-size:24px;color:#000;margin:0 0 20px;">Forgot your password?</h1>
              <p style="font-size:16px;color:#666;margin:0 0 30px;">
                Here is your code to reset your password:
              </p>
              <!-- زرار فيه الكود -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                <tr>
                  <td align="center" bgcolor="#0055FF" style="border-radius:8px;padding:14px 28px;">
                    <span style="font-size:20px;color:#FFFFFF;font-weight:bold;letter-spacing:2px;">
                      ${code}
                    </span>
                  </td>
                </tr>
              </table>
              <p style="font-size:14px;color:#999;margin-top:30px;">
                If you didn’t request a password reset, you can ignore this email.
              </p>
            </td>
          </tr>
        </table>
        <p style="font-size:12px;color:#BBB;margin:20px 0 0;">
          Ecommerce Website © Mohamed Salah
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
