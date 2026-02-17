export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div>
      <h1>Profile</h1>
      {user ? <p>Email: {user.email}</p> : <p>No user found</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
