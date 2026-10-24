import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Official WhatsApp handset-in-bubble vector icon
 */
export const WhatsAppIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M12.031 2C6.508 2 2.023 6.485 2.023 12.008c0 1.766.461 3.49 1.337 5.01L2 22l5.122-1.343a9.967 9.967 0 0 0 4.908 1.292h.004c5.522 0 10.007-4.485 10.007-10.008 0-2.674-1.041-5.188-2.932-7.079A9.946 9.946 0 0 0 12.031 2Zm5.847 14.324c-.246.693-1.425 1.326-1.996 1.411-.513.077-1.183.11-1.911-.121-.443-.141-1.012-.329-1.74-.643-3.063-1.322-5.063-4.407-5.216-4.611-.153-.204-1.246-1.658-1.246-3.163 0-1.505.788-2.245 1.068-2.551.28-.306.611-.383.815-.383.204 0 .407.002.585.011.188.009.44-.071.688.526.254.612.865 2.118.941 2.271.076.153.127.332.025.536-.102.204-.153.332-.306.51-.153.179-.321.4-.458.536-.153.153-.312.319-.134.625.178.306.791 1.305 1.698 2.114 1.167 1.04 2.15 1.363 2.456 1.516.306.153.484.128.662-.077.178-.204.764-.893.968-1.199.204-.306.407-.255.688-.153.28.102 1.782.841 2.088.994.306.153.509.23.585.357.077.128.077.74-.169 1.433Z" />
  </svg>
);

/**
 * Crisp Medical Supply Cart / Inquiry Bag Icon
 */
export const InquiryCartIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
