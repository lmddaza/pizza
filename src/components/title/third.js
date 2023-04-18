export default function Contact({ Name, Address, Number }) {
  return (
    <div>
      <br></br>
      <h3> Contact Info: </h3>
      <p>Name: {Name}</p>
      <p>Address: {Address}</p>
      <p>Phone Number: {Number}</p>
    </div>
  );
}
