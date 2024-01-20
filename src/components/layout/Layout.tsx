import Header from "../Header/Header";

type props = { children: React.ReactNode };

function Layout({ children }: props) {
  return (
    <div className="">
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
