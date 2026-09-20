export interface Course {
  image: string
  tag: string
  title: string
  desc: string
  duration: string
  durationHours: number
  students: string
  studentsCount: number
  rating: string
  ratingValue: number
  price: string
  priceToman: number
}

export const courses: Course[] = [
  {
    image: '/images/course-1.png',
    tag: 'روانشناسی شناختی',
    title: 'اصول روان‌درمانی شناختی-رفتاری',
    desc: 'آشنایی با تکنیک‌های علمی درمان اضطراب، افسردگی و بازسازی الگوهای فکری.',
    duration: '۲۴ ساعت',
    durationHours: 24,
    students: '۱٬۸۰۰',
    studentsCount: 1800,
    rating: '۴٫۹',
    ratingValue: 4.9,
    price: '۲٬۴۰۰٬۰۰۰',
    priceToman: 2400000,
  },
  {
    image: '/images/course-2.png',
    tag: 'خانواده و ازدواج',
    title: 'مشاوره خانواده و مهارت‌های زندگی',
    desc: 'بهبود روابط زناشویی و تربیت فرزندان بر اساس اصول روانشناسی و سبک زندگی اسلامی.',
    duration: '۱۸ ساعت',
    durationHours: 18,
    students: '۲٬۳۵۰',
    studentsCount: 2350,
    rating: '۴٫۸',
    ratingValue: 4.8,
    price: '۱٬۹۰۰٬۰۰۰',
    priceToman: 1900000,
  },
  {
    image: '/images/course-3.png',
    tag: 'روانشناسی اسلامی',
    title: 'روان‌شناسی معنوی و آرامش درون',
    desc: 'کشف پیوند میان معنویت، ذکر و سلامت روان بر پایه آموزه‌های قرآن و اهل‌بیت (ع).',
    duration: '۲۰ ساعت',
    durationHours: 20,
    students: '۱٬۵۲۰',
    studentsCount: 1520,
    rating: '۵٫۰',
    ratingValue: 5,
    price: '۲٬۱۰۰٬۰۰۰',
    priceToman: 2100000,
  },
]