type TAnnouncementLayoutProps = {
  children: React.ReactNode;
};

// max-w-[768px]
const AnnouncementLayout = ({ children }: TAnnouncementLayoutProps) => {
  return <div className="mx-auto min-h-[100vh]">{children}</div>;
};

export default AnnouncementLayout;
