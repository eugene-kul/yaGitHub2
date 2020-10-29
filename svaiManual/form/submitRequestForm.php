<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'libs/PHPMailer/src/Exception.php';
	require 'libs/PHPMailer/src/PHPMailer.php';
	require 'libs/PHPMailer/src/SMTP.php';

	$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = 2;                                       // Enable verbose debug output
    $mail->isSMTP();                                            // Set mailer to use SMTP
    $mail->Host       = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'svai-vintovye-krasnoyarsk@yandex.ru';                     // SMTP username
    $mail->Password   = 'yYbgtvgG7T8';                               // SMTP password
    $mail->SMTPSecure = 'ssl';                                  // Enable TLS encryption, `ssl` also accepted
    $mail->Port       = 465;                                    // TCP port to connect to
    $mail->CharSet    = 'utf-8';

    //Recipients
    $mail->setFrom('svai-vintovye-krasnoyarsk@yandex.ru', 'Сваи КРАСНОЯРСК Заявка');
    $mail->addAddress('svai-vintovye-krasnoyarsk@yandex.ru', 'Сваи КРАСНОЯРСК Заявка');

    // Content
        if (empty($_POST['pageName']) || empty($_POST['pageAddress'])) {
            unset($_POST['siteName']);
            unset($_POST['siteAddress']);
            unset($_POST['pageName']);
            unset($_POST['pageAddress']);
                
            $_POST['siteName'] = $_SERVER['HTTP_HOST'];
            $_POST['siteAddress'] = $_SERVER['HTTP_HOST'];
            $_POST['pageName'] = $_SERVER['HTTP_REFERER'];
            $_POST['pageAddress'] = $_SERVER['HTTP_REFERER'];   
        }
    
    $message = '';
    $message = $message  . '<table style="color: #5c5c5c;" border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#03A9F4" align="center"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" > <tr> <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> <a href="https://ya-mobile.ru/" target="_blank"> <img alt="Logo" src="http://ya-mobile.ru/identity/ya-mobile-logo-white.png" width="125" height="20" style=" display: block; width: 125px; max-width: 125px; min-width: 20px; font-family: \'Lato\', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px; " border="0"/> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td bgcolor="#03A9F4" align="center" style="padding: 0px 10px 0px 10px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" > <tr> <td bgcolor="#ffffff" align="center" valign="top" style=" padding: 0 20px 0x 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: \'Lato\', Helvetica, Arial, sans-serif; " > <h1 style=" font-size: 22px; font-weight: 600; margin: 40px 20px 20px 20px; color: #e74c3c; " > Клиент ждёт звонка, перезвоните ему сейчас </h1> <p style=" margin: 0 20px 0 20px; font-size: 18px; font-weight: 400; color: #757575; " > Новая заявка на сайте <a href="' . $_POST['siteAddress'] . '" style="color: #0288d1;" >' . $_POST['siteName'] . '</a > </p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td align="center" bgcolor="#F5F5F5" style="padding: 0px 10px 0px 10px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" > <tr> <td bgcolor="#ffffff" align="left" style=" padding: 20px 20px 20px 20px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px; " ></td></tr>' . '<tr> <td> <table align="left" border="0" cellpadding="0" cellspacing="0" style=" background-color: #bdbdbd; border: 0; clear: both; font-family: \'open sans\', sans-serif; font-size: 15px; margin: 0 auto 0 auto; table-layout: fixed; width: 100%; " > <colgroup> <col width="30%"/> <col width="70%"/> </colgroup> <tbody> <tr style=" margin-bottom: 1px; background-color: #ffffff; padding: 10px 5.83% 10px 5.83%; border-bottom: 1px solid #000; " > <td align="left" style=" padding: 16px 5.83% 16px 5.83%; word-break: break-all; color: #212121; " > <strong>' . 'Страница' . '</strong> </td><td align="left" style=" padding: 16px 5.83% 16px 5.83%; word-break: break-all; " >' . '<a style="color:#0288d1" href="' . $_POST['pageAddress'] . '">' . $_POST['pageName'] . '</a>'  . '</td></tr><tr> <td style="padding: 1px 0 0 0; background-color: #bdbdbd;" ></td></tr></tbody> </table> </td></tr>';
    $siteName = $_POST['siteName'];
    $siteAddress = $_POST['siteAddress'];
    unset($_POST['siteName']);
    unset($_POST['siteAddress']);
    unset($_POST['pageName']);
    unset($_POST['pageAddress']);
    foreach ($_POST as $key => $value) {
        $message = $message . '<tr> <td> <table align="left" border="0" cellpadding="0" cellspacing="0" style=" background-color: #bdbdbd; border: 0; clear: both; font-family: \'open sans\', sans-serif; font-size: 15px; margin: 0 auto 0 auto; table-layout: fixed; width: 100%; " > <colgroup> <col width="30%"/> <col width="70%"/> </colgroup> <tbody> <tr style=" margin-bottom: 1px; background-color: #ffffff; padding: 10px 5.83% 10px 5.83%; border-bottom: 1px solid #000; " > <td align="left" style=" padding: 16px 5.83% 16px 5.83%; word-break: break-all; color: #212121; " > <strong>' . $key . '</strong> </td><td align="left" style=" padding: 16px 5.83% 16px 5.83%; word-break: break-all; " >' . $value . '</td></tr><tr> <td style="padding: 1px 0 0 0; background-color: #bdbdbd;" ></td></tr></tbody> </table> </td></tr>';
    }
    $message = $message . '</table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" > <tr> <td bgcolor="#FFFFFF" align="left" style=" padding: 30px 20px 30px 20px; color: #212121; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px; " > <h2 align="center" style="font-size: 16px; font-weight: 600; margin: 0;" > Не отвечайте на это письмо </h2> </td></tr></table> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" > <tr> <td bgcolor="#F0F0F0" align="left" style=" padding: 15px 20px 15px 20px; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px; " > Команда Ya-mobile </td><td bgcolor="#F0F0F0" align="right" style=" padding: 15px 20px 15px 20px; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px; vertical-align: middle; " > <a href="https://vk.com/yamobileru" style="text-decoration: none;"> <img src="http://ya-mobile.ru/identity/card-request-vk.png"> </a> <a style="text-decoration: none;" href="https://www.facebook.com/Ya-mobile-%D0%B0%D0%B3%D0%B5%D0%BD%D1%82%D1%81%D1%82%D0%B2%D0%BE-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D0%BC%D0%B0%D1%80%D0%BA%D0%B5%D1%82%D0%B8%D0%BD%D0%B3%D0%B0-1602391013423564/" > <img src="http://ya-mobile.ru/identity/card-request-facebook.png"> </a> <a style="text-decoration: none;" href="https://www.instagram.com/ya_mobile.ru/"> <img src="http://ya-mobile.ru/identity/card-request-instagram.png"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" > <tr> <td bgcolor="#f4f4f4" align="left" style=" padding: 20px 20px 20px 20px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px; " > <p align="center" style="margin: 0;"> По техническим вопросам пишите на нашу почту: <a href="mailto:support@ya-mobile.ru" style="color: #5c5c5c;" >support@ya-mobile.ru</a > </p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table>';
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = '💡 Заявка с сайта';
    $mail->Body    = $message;
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>