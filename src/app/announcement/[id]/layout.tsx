type TAnnouncementLayoutProps = {
  children: React.ReactNode;
};

// max-w-[768px]
const AnnouncementLayout = ({ children }: TAnnouncementLayoutProps) => {
  return <section className="mx-auto min-h-[100vh]">{children}</section>;
};

export default AnnouncementLayout;
