import { DifficultyLevel, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Create a Faculty
  const faculty = await prisma.faculty.upsert({
    where: { slug: 'engineering-technology' },
    update: {},
    create: {
      name: 'Engineering & Technology',
      slug: 'engineering-technology',
      description: 'The hub for modern engineering and software sciences.',
      imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1000',
    },
  });

  // 2. Create a Department
  const department = await prisma.department.upsert({
    where: { slug: 'computer-science' },
    update: {},
    create: {
      name: 'Computer Science',
      slug: 'computer-science',
      description: 'Innovating the future through code.',
      facultyId: faculty.id,
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000',
    },
  });

  // 3. Create 5 Subjects (Courses)
  const subjects = [
    {
      title: 'Advanced Web Development',
      slug: 'adv-web-dev',
      description: 'Master modern frontend and backend frameworks.',
      difficultyLevel: DifficultyLevel.ADVANCED,
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
    },
    {
      title: 'Database Management Systems',
      slug: 'db-management',
      description: 'Learn SQL, NoSQL and database optimization.',
      difficultyLevel: DifficultyLevel.INTERMEDIATE,
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=1000',
    },
    {
      title: 'Artificial Intelligence',
      slug: 'intro-ai',
      description: 'Explore neural networks, machine learning and logic.',
      difficultyLevel: DifficultyLevel.ADVANCED,
      price: 399.99,
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
    },
    {
      title: 'Mobile App Development',
      slug: 'mobile-dev',
      description: 'Build native and cross-platform apps.',
      difficultyLevel: DifficultyLevel.INTERMEDIATE,
      price: 249.99,
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000',
    },
    {
      title: 'Information Security',
      slug: 'info-sec',
      description: 'Protect systems and networks from cyber threats.',
      difficultyLevel: DifficultyLevel.BEGINNER,
      price: 149.99,
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
    },
  ];

  for (const s of subjects) {
    await prisma.subject.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        ...s,
        departmentId: department.id,
      },
    });
  }

  console.log('Seed completed successfully! Created 1 Faculty, 1 Department, and 5 Courses.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
