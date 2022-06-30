function Home() {
  return (
    <Card
      txtcolor="black"
      bgcolor="light"
      header="Bad Bank Landing Page"
      title="Welcome to Bad Bank"
      text="Use this bank at your own risk"
      body={<img src="bank.png" className="img-fluid" alt="Responsive image" />}
    />
  );
}
