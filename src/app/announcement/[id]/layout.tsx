type TAnnouncementLayoutProps = {
  children: React.ReactNode;
};

// max-w-[768px]
const AnnouncementLayout = ({ children }: TAnnouncementLayoutProps) => {
  return <div className="mx-auto">{children}</div>;
};

export default AnnouncementLayout;
