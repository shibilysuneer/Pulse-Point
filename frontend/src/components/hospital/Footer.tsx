// import React from 'react';
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-white border-t text-gray-700 pt-10 pb-6 px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div>
        <h3 className="text-red-600 font-bold mb-2">Donate Blood</h3>
        <ul>
          <li>Blood Donor</li>
          <li>Blood Types</li>
          <li>Donor Rewards</li>
        </ul>
      </div>
      <div>
        <h3 className="text-red-600 font-bold mb-2">Locations</h3>
        <ul>
          <li>Illinois Donor</li>
          <li>Host a Drive</li>
          <li>Missouri Donor</li>
        </ul>
      </div>
      <div>
        <h3 className="text-red-600 font-bold mb-2">Join Our Team</h3>
        <ul>
          <li>Partners Life</li>
          <li>Volunteer Opportunities</li>
          <li>Blood Donor</li>
        </ul>
      </div>
      <div>
        <p className="text-sm">
          If you’re a blood donor, you’re a hero to someone, somewhere, who received your gracious gift of life
        </p>
        <div className="flex gap-4 mt-4 text-red-600 text-xl">
          <FaTwitter />
          <FaLinkedin />
          <FaFacebook />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
