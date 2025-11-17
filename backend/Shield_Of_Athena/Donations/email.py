from django.core.mail import send_mail
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv
import os

def confirmation(first_name, amount, currency, impact_pathway_name=None, recipient_email=None,):

    impact_section = f"Impact pathway: {impact_pathway_name}\n" if impact_pathway_name else ""
    amount_section = f"Amount: {amount} {currency}\n"

    contributions_header = "Today, you chose to contribute to:\n\n" if (impact_section and amount_section) else ""

    message = f"""Dear {first_name},

Thank you for your generous donation to Shield of Athena.

Your support helps provide safety and support for women and children affected by domestic and family violence.
{contributions_header}{impact_section}{amount_section}
Because of you, we can continue offering services such as shelter, counselling, and programs for children in need of safety and healing.

We are deeply grateful for your trust and solidarity.

With gratitude,
Shield of Athena
"""

    recipient_list = [recipient_email] if recipient_email else []
    if recipient_list:
        sender_email = os.getenv("LOGIN")
        sender_password = os.getenv("PASSWORD")

        msg = EmailMessage()
        msg["Subject"] = "Thank you for your Donation"
        msg["From"] = sender_email
        msg["To"] = recipient_email
        msg.set_content(message)
        
        try:
            with smtplib.SMTP("smtp.mailgun.org", 587) as server:
                server.starttls()  # Secure the connection with TLS
                server.login(sender_email, sender_password)
                server.send_message(msg)
            print("Email sent successfully!")
        except Exception as e:
            print(f"Failed to send email: {e}")    

        send_mail(
            subject="Thank you for your donation to Shield of Athena",
            from_email="noreply@shieldofathena.ca",
            message=message,
            recipient_list=recipient_list,
        )