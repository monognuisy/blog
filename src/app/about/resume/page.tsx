import { redirect } from 'next/navigation';

const ResumePage = () => {
  const resumeUrl = `${process.env.NEXT_PUBLIC_BUCKET_ABOUT_PREFIX}/about/resume_frontend.pdf`;

  redirect(resumeUrl);
};

export default ResumePage;
