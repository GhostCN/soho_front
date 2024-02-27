import Link from "next/link";

const Social = () => {
  return (
    <>
      <li>
        <Link href="#">
          <i className="fab fa-facebook-f"></i>
        </Link>
      </li>
      <li>
        <Link href="#">
          <i className="fab fa-instagram"></i>
        </Link>
      </li>
      <li>
        <Link href="#">
          <i className="fab fa-twitter"></i>
        </Link>
      </li>
      <li>
        <Link href="#">
          <i className="fab fa-linkedin-in"></i>
        </Link>
      </li>
    </>
  );
};

export default Social;
