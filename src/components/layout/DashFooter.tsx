import { Footer } from 'flowbite-react';

export default function DashFooter() {
  return (
    <Footer container className="sticky top-[100vh]">
      <Footer.Copyright by="YourApplication™" href="#" year={2025} />
      <Footer.LinkGroup>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
