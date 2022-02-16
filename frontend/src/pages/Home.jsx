import { useSelector } from 'react-redux';

function Home() {
  const { firstName, lastName, email } = useSelector((state) => state.auth.user);

  return (
    <>
      <h1>Welcome back {`${firstName} ${lastName}`}</h1>
      <section>Your feed...</section>
    </>
  );
}

export default Home;
