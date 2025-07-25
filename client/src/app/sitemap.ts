import { MetadataRoute } from 'next'

const site = process.env.NEXT_PUBLIC_DEPLOY_SITE_ADDRESS || 'https://aicontact.tech';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site,
      lastModified: new Date(), // Указываем текущую дату как дату последнего изменения
      changeFrequency: 'weekly', // Указываем, что главная страница меняется еженедельно
      priority: 1, // Придаем главной странице наивысший приоритет
    },
    {
      url: `${site}/chat`,
      lastModified: new Date(), // Указываем текущую дату как дату последнего изменения
      changeFrequency: 'weekly', // Указываем, что страница чата меняется еженедельно
      priority: 0.9, // Придаем странице чата высокий приоритет
    },
  ]
}