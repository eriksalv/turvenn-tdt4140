import { useSelector } from 'react-redux';

function Profile() {
  // Burde hente fra en userSlice i redux med alle brukere, men dette fungerer foreløpig
  const { user } = useSelector((state) => state.auth);

  if (!user) return <h1>Loading...</h1>;

  return (
    <>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <h3>{user.email}</h3>
    </>
  );
}

export default Profile;
