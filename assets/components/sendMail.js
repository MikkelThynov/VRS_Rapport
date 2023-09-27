
import * as MailComposer from 'expo-mail-composer';




export async function sendMail(to, subject, body, attachmentUri) {     

    const mail = {
        to,
        subject,
        body,
        attachments: [attachmentUri]
    }

   

    return MailComposer.composeAsync(mail);
}
