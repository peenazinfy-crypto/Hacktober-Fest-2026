import { SampleScamScenario } from '../types';

export const SAMPLE_SCENARIOS: SampleScamScenario[] = [
  {
    id: 'electricity-scam',
    title: 'Electricity Power Disconnection Alert',
    category: 'Electricity',
    tag: 'Urgent Threat',
    description: 'Threatens power cutoff tonight at 9:30 PM with personal mobile number to call.',
    contextText: 'Received this SMS at 7:30 PM today from a regular 10-digit mobile number.',
    imagePromptData: {
      appName: 'Messages',
      sender: '+91 98451 23456',
      timestamp: 'Today, 7:30 PM',
      bodyText:
        'Dear Consumer,\nYour electricity power will be disconnected tonight at 9:30 PM from electricity office because your previous month bill was not updated.\n\nPlease immediately contact our electricity officer Mr. RK Sharma at 9845123456.\nThank You.\n- Electricity Dept.',
      accentColor: '#dc2626',
    },
  },
  {
    id: 'india-post-scam',
    title: 'India Post Delivery Failed / Address Update',
    category: 'Postal / Delivery',
    tag: 'Fake Courier Link',
    description: 'Claims parcel cannot be delivered without updating address on a suspicious link.',
    contextText: 'Received while expecting a package from an online shopping order.',
    imagePromptData: {
      appName: 'Messages',
      sender: '+91 70123 99881',
      timestamp: 'Today, 2:15 PM',
      bodyText:
        '[India Post Alert]\nYour package #IN94820419 cannot be delivered due to incomplete house address.\n\nPackage held at sorting hub. Please update your address within 24 hours at:\nhttps://indiapost-update-portal.top/track\n\nFailing to do so, package will be returned to sender.',
      highlightUrl: 'https://indiapost-update-portal.top/track',
      accentColor: '#ea580c',
    },
  },
  {
    id: 'upi-cashback-scam',
    title: 'UPI "Enter PIN to Receive ₹3,500" Cashback',
    category: 'UPI / Payment',
    tag: 'UPI PIN Trap',
    description: 'Asks user to scan QR code and enter UPI PIN to receive a cashback reward.',
    contextText: 'A caller claiming to be from customer support sent this on WhatsApp.',
    imagePromptData: {
      appName: 'WhatsApp',
      sender: '+91 88990 11223 (Customer Care)',
      timestamp: 'Today, 11:42 AM',
      bodyText:
        '🎉 Congratulations Sir/Madam!\n\nYou have won Diwali Special Cashback of ₹3,500.00!\n\nTo deposit cash directly into your bank account, please approve the payment request or scan QR code and ENTER YOUR 4-DIGIT / 6-DIGIT UPI PIN to complete deposit.\n\nRef ID: UPI/CB/9948271',
      accentColor: '#16a34a',
    },
  },
  {
    id: 'sbi-kyc-scam',
    title: 'SBI YONO Blocked / PAN Card Update',
    category: 'Banking / KYC',
    tag: 'Banking Phishing',
    description: 'Claims bank account will be closed unless PAN card is uploaded on fake portal.',
    contextText: 'Received from an ordinary mobile number, not official bank sender code like AX-SBI.',
    imagePromptData: {
      appName: 'Messages',
      sender: '+91 93112 44556',
      timestamp: 'Yesterday, 8:10 PM',
      bodyText:
        'Dear Customer,\nYour SBI YONO netbanking account has been blocked today due to pending PAN card re-verification.\n\nPlease click link to update PAN details immediately:\nhttp://sbiyono-pan-verification.online\n\nNon-compliance will result in permanent account suspension.',
      highlightUrl: 'http://sbiyono-pan-verification.online',
      accentColor: '#2563eb',
    },
  },
  {
    id: 'telegram-job-scam',
    title: 'YouTube Like & Earn ₹5,000/Day Part-time Job',
    category: 'Job / Task',
    tag: 'Prepaid Task Scam',
    description: 'Promotes high daily earnings for simple likes, redirecting to Telegram group.',
    contextText: 'Unsolicited WhatsApp message from a business profile claiming to be HR recruiter.',
    imagePromptData: {
      appName: 'WhatsApp',
      sender: '+91 91234 56789 (Pooja HR)',
      timestamp: 'Today, 10:05 AM',
      bodyText:
        'Greetings! 🌸\nAre you interested in a flexible part-time online job?\n\nEarn ₹3,000 - ₹8,000 daily by simply liking YouTube videos and rating hotels on Google Maps.\n\n✅ 10-15 mins daily\n✅ Instant bank transfer\n✅ No registration fee\n\nContact Task Manager on Telegram: @Global_Task_Payouts to start earning immediately!',
      accentColor: '#8b5cf6',
    },
  },
];

/**
 * Creates a realistic mobile message screenshot as a PNG base64 string
 */
export function generateSampleScreenshot(
  scenario: SampleScamScenario
): { base64: string; mimeType: string } | null {
  const width = 640;
  const height = 780;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const { sender, appName, timestamp, bodyText, highlightUrl, accentColor } =
    scenario.imagePromptData;

  // Background - Phone Frame / Wallpaper
  ctx.fillStyle = '#0f172a'; // dark slate outer
  ctx.fillRect(0, 0, width, height);

  // Phone inner card / screen area
  const screenPad = 16;
  ctx.fillStyle = appName === 'WhatsApp' ? '#0b141a' : '#f8fafc';
  ctx.beginPath();
  ctx.roundRect(screenPad, screenPad, width - screenPad * 2, height - screenPad * 2, 24);
  ctx.fill();
  ctx.clip();

  const isDark = appName === 'WhatsApp';

  // Status Bar
  ctx.fillStyle = isDark ? '#ffffff' : '#1e293b';
  ctx.font = '600 13px system-ui, -apple-system, sans-serif';
  ctx.fillText('9:41 AM', screenPad + 24, screenPad + 30);
  ctx.fillText('5G  100%', width - screenPad - 78, screenPad + 30);

  // App Bar / Header
  const headerY = screenPad + 45;
  ctx.fillStyle = isDark ? '#202c33' : '#ffffff';
  ctx.fillRect(screenPad, headerY, width - screenPad * 2, 64);

  // App Header divider line
  ctx.fillStyle = isDark ? '#2a3942' : '#e2e8f0';
  ctx.fillRect(screenPad, headerY + 63, width - screenPad * 2, 1);

  // Back arrow icon
  ctx.strokeStyle = isDark ? '#aebac1' : '#475569';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(screenPad + 36, headerY + 32);
  ctx.lineTo(screenPad + 24, headerY + 32);
  ctx.lineTo(screenPad + 30, headerY + 26);
  ctx.moveTo(screenPad + 24, headerY + 32);
  ctx.lineTo(screenPad + 30, headerY + 38);
  ctx.stroke();

  // Avatar Circle
  ctx.fillStyle = accentColor;
  ctx.beginPath();
  ctx.arc(screenPad + 66, headerY + 32, 18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(appName === 'WhatsApp' ? 'WA' : 'SMS', screenPad + 66, headerY + 37);
  ctx.textAlign = 'left';

  // Sender Name & Subtitle
  ctx.fillStyle = isDark ? '#e9edef' : '#0f172a';
  ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
  ctx.fillText(sender, screenPad + 96, headerY + 26);

  ctx.fillStyle = isDark ? '#8696a0' : '#64748b';
  ctx.font = '400 12px system-ui, -apple-system, sans-serif';
  ctx.fillText(`${appName} • ${timestamp}`, screenPad + 96, headerY + 44);

  // Chat / Message Area
  // Notice Pill
  const pillY = headerY + 84;
  ctx.fillStyle = isDark ? '#182229' : '#f1f5f9';
  ctx.beginPath();
  ctx.roundRect(width / 2 - 110, pillY, 220, 26, 13);
  ctx.fill();

  ctx.fillStyle = isDark ? '#8696a0' : '#64748b';
  ctx.font = '500 11px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Messages are end-to-end unverified', width / 2, pillY + 17);
  ctx.textAlign = 'left';

  // Message Bubble
  const bubbleX = screenPad + 24;
  const bubbleY = pillY + 42;
  const bubbleWidth = width - screenPad * 2 - 48;
  const bubbleHeight = 440;

  ctx.fillStyle = isDark ? '#202c33' : '#ffffff';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;
  ctx.beginPath();
  ctx.roundRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 16);
  ctx.fill();
  ctx.shadowColor = 'transparent'; // reset

  // Bubble border for SMS
  if (!isDark) {
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Warning banner inside message bubble
  ctx.fillStyle = isDark ? 'rgba(239, 68, 68, 0.15)' : '#fef2f2';
  ctx.beginPath();
  ctx.roundRect(bubbleX + 16, bubbleY + 16, bubbleWidth - 32, 34, 8);
  ctx.fill();

  ctx.fillStyle = '#dc2626';
  ctx.font = 'bold 12px system-ui, -apple-system, sans-serif';
  ctx.fillText('⚠️ UNKNOWN SENDER • HIGH SUSPICION', bubbleX + 28, bubbleY + 38);

  // Body Text Wrapping
  ctx.fillStyle = isDark ? '#d1d7db' : '#1e293b';
  ctx.font = '400 14px system-ui, -apple-system, sans-serif';

  const lines = bodyText.split('\n');
  let currentY = bubbleY + 76;
  const lineHeight = 22;

  for (const line of lines) {
    if (line.trim() === '') {
      currentY += 10;
      continue;
    }

    if (highlightUrl && line.includes(highlightUrl)) {
      ctx.fillStyle = '#2563eb';
      ctx.font = 'bold 13px monospace';
      ctx.fillText(line, bubbleX + 20, currentY);
      ctx.fillStyle = isDark ? '#d1d7db' : '#1e293b';
      ctx.font = '400 14px system-ui, -apple-system, sans-serif';
    } else {
      ctx.fillText(line, bubbleX + 20, currentY);
    }
    currentY += lineHeight;
  }

  // Indian Safety Watermark / Overlay tag
  ctx.fillStyle = isDark ? '#8696a0' : '#94a3b8';
  ctx.font = 'italic 11px system-ui, -apple-system, sans-serif';
  ctx.fillText('Simulated Screenshot for ScamSense Educational Analysis', bubbleX + 20, bubbleY + bubbleHeight - 20);

  // Return base64 JPEG string and mimeType
  const mimeType = 'image/jpeg';
  const fullDataUrl = canvas.toDataURL(mimeType, 0.9);
  const base64 = fullDataUrl.replace(/^data:image\/jpeg;base64,/, '');
  return { base64, mimeType };
}

