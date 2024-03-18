import Image from "next/image";
import Link from "next/link";
import team_member_1 from "/public/img/team-member-1.png";
import team_member_2 from "/public/img/team-member-2.png";
import team_member_3 from "/public/img/team-member-3.png";
import team_member_4 from "/public/img/team-member-4.png";
import team_member_5 from "/public/img/team-member-5.png";
import team_member_6 from "/public/img/team-member-6.png";
import team_member_7 from "/public/img/team-member-7.png";
import team_member_8 from "/public/img/team-member-8.png";

const teamMembers = [
  {
    id: 1,
    name: "Mark price",
    img: team_member_1,
    designation: "CEO & Founder",
  },
  {
    id: 2,
    name: "Abel Rivera",
    img: team_member_2,
    designation: "CEO & Founder",
  },
  {
    id: 3,
    name: "Paul Ryan",
    img: team_member_3,
    designation: "CEO & Founder",
  },
  {
    id: 4,
    name: "Erica silva",
    img: team_member_4,
    designation: "CEO & Founder",
  },
  {
    id: 5,
    name: "Mark price",
    img: team_member_5,
    designation: "CEO & Founder",
  },
  {
    id: 6,
    name: "Erica Silva",
    img: team_member_6,
    designation: "CEO & Founder",
  },
  {
    id: 7,
    name: "Mark price",
    img: team_member_7,
    designation: "CEO & Founder",
  },
  {
    id: 8,
    name: "Paul Ryan",
    img: team_member_8,
    designation: "CEO & Founder",
  },
];

const TeamMember = () => {
  return (
    <section className="team-member">
      <div className="overlay pb-120">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8 d-flex justify-content-center">
              <div className="section-header text-center">
                <h2 className="title">
                  Our team is an incredible group of people
                </h2>
                <p>
                  We are a team of entrepreneurs, payment specialists and
                  blockchain enthusiasts. Dedicated to simplifying global
                  payments for your business
                </p>
              </div>
            </div>
          </div>
          <div className="row cus-mar">
            {teamMembers.map(({ id, designation, img, name }) => (
              <div key={id} className="col-lg-3 col-md-6">
                <Link href="/team-details" className="single-item d-block">
                  <div className="img-wrapper">
                    <Image src={img} alt="icon" />
                  </div>
                  <div className="text-area">
                    <h6>{name}</h6>
                    <span className="smr">{designation}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMember;
