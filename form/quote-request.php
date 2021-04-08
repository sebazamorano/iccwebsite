<?php
header('Content-type: application/json');
require_once('php-mailer/PHPMailerAutoload.php'); // Include PHPMailer

$mail = new PHPMailer();
$emailTO = $emailBCC =  $emailCC = array(); $formEmail = '';

### Enter Your Sitename
$sitename = 'icc-ingenieria.cl';

### Enter your email addresses: @required
$emailTO[] = array( 'email' => 'iccingen@icc-ingenieria.cl', 'name' => 'ICC Ingenieria' );

### Enable bellow parameters & update your BCC email if require.
$emailBCC[] = array( 'email' => 'mrafols@icc-ingenieria.cl', 'name' => 'Marcel' );
$emailBCC[] = array( 'email' => 'gpezoa@icc-ingenieria.cl', 'name' => 'G Pezoa' );

### Enable bellow parameters & update your CC email if require.
//$emailCC[] = array( 'email' => 'email@yoursite.com', 'name' => 'Your Name' );

### Enter Email Subject
$subject = "Contacto" . ' - ' . $sitename;

### If you did not recive email after submit form please enable below line and change to correct domain name. eg. noreply@example.com
//$formEmail = 'noreply@yoursite.com';

### Success Messages
$msg_success = "We have <strong>successfully</strong> received your request. We'll get back to you soon.";

if( $_SERVER['REQUEST_METHOD'] == 'POST') {
	if (isset($_POST["quote-request-email"]) && $_POST["quote-request-email"] != '' && isset($_POST["quote-request-name"]) && $_POST["quote-request-name"] != '') {
		### Form Fields
		$qr_email	= $_POST["quote-request-email"];
		$qr_name	= $_POST["quote-request-name"];

		$qr_phone	= isset($_POST["quote-request-phone"]) ? $_POST["quote-request-phone"] : '';
		$qr_company	= isset($_POST["quote-request-company"]) ? $_POST["quote-request-company"] : '';
		$qr_reach	= isset($_POST["quote-request-reach"]) ? $_POST["quote-request-reach"] : '';
		$qr_hear	= isset($_POST["quote-request-hear"]) ? $_POST["quote-request-hear"] : '';

		$qr_interest = isset($_POST["quote-request-interest"]) ? $_POST["quote-request-interest"] : '';
		$qr_interested = '';
		if (is_array($qr_interest)) {
			foreach ($qr_interest as $interest) {
				$qr_interested .= ', '.$interest;
			}
		} else {
			$qr_interested = $qr_interest;
		}
		$qr_interested = ($qr_interested !='') ? substr($qr_interested, 2) : '';

		$qr_message	= isset($_POST["quote-request-message"]) ? $_POST["quote-request-message"] : '';

		$honeypot 	= isset($_POST["form-anti-honeypot"]) ? $_POST["form-anti-honeypot"] : '';
		$bodymsg	= '';

		if ($honeypot == '' && !(empty($emailTO))) {
			$mail->IsHTML(true);
			$mail->CharSet = 'UTF-8';

			$mail->From = ($formEmail !='') ? $formEmail : $qr_email;
			$mail->FromName = $qr_name . ' - ' . $sitename;
			$mail->AddReplyTo($qr_email);
			$mail->Subject = $subject;

			foreach( $emailTO as $to ) {
				$mail->AddAddress( $to['email'] , $to['name'] );
			}

			### if CC found
			if (!empty($emailCC)) {
				foreach( $emailCC as $cc ) {
					$mail->AddCC( $cc['email'] , $cc['name'] );
				}
			}

			### if BCC found
			if (!empty($emailBCC)) {
				foreach( $emailBCC as $bcc ) {
					$mail->AddBCC( $bcc['email'] , $bcc['name'] );
				}
			}

			### Include Form Fields into Body Message
			$bodymsg .= isset($qr_name) ? "Nombre: $qr_name<br><br>" : '';
			$bodymsg .= isset($qr_email) ? "Email: $qr_email<br><br>" : '';
			$bodymsg .= isset($qr_phone) ? "Fono: $qr_phone<br><br>" : '';
			$bodymsg .= isset($qr_company) ? "Compañia: $qr_company<br><br><br>" : '';
			$bodymsg .= isset($qr_interested) ? "Services Interested: $qr_interested<br><br>" : '';
			$bodymsg .= isset($qr_message) ? "Mensaje: $qr_message<br><br>" : '';
			$bodymsg .= $_SERVER['HTTP_REFERER'] ? '<br>---<br><br>Este email fue enviado desde: ' . $_SERVER['HTTP_REFERER'] : '';

			$mail->MsgHTML( $bodymsg );

			$is_emailed = $mail->Send();

			if( $is_emailed === true ) {
				$response = array ('result' => "success", 'message' => $msg_success);
			} else {
				$response = array ('result' => "error", 'message' => $mail->ErrorInfo);
			}
			echo json_encode($response);

		} else {
			echo json_encode(array ('result' => "error", 'message' => "Bot <strong>Detected</strong>! Please try later."));
		}
	} else {
		echo json_encode(array ('result' => "error", 'message' => "Please <strong>Fill up</strong> all required fields and try again."));
	}
}
