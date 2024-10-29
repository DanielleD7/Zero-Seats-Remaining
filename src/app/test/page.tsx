'use client';

import { useRouter } from 'next/navigation';
import PageTransition from '../../components/meta/page-transition';

export default function Welcome() {
  const router = useRouter();

  const handleFindClassesClick = () => {
    router.push('/find-classes');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Course Registration</h1>
        <button 
          onClick={handleFindClassesClick}
          className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
        >
          Find Classes
        </button>
      </div>
    </PageTransition>
  );
}