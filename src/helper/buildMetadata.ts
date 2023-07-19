import { Metadata } from 'next';

function buildMetadata({
  title = 'Finanzas',
  description = 'Una aplicación para administrar tus finanzas y controlar tu dinero de manera efectiva.',
}: Metadata): Metadata {
  return {
    title,
    description,
    keywords: [
      'finanzas',
      'dinero',
      'administración financiera',
      'gestión monetaria',
    ],
    authors: [
      {
        name: 'mrLuisFer',
        url: 'https://mrluisfer.vercel.app/',
      },
    ],
    robots: 'index, follow',
    creator: 'mrLuisFer',
    twitter: {
      card: 'summary',
      site: '@ejemplo',
      creator: '@mrluisfer_',
      title: 'Finanzas',
      description:
        'Una aplicación para administrar tus finanzas y controlar tu dinero de manera efectiva.',
    },
  };
}

export default buildMetadata;
