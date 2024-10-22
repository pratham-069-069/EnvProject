import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaRecycle, FaTree } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link to="/" className="flex items-center text-2xl font-bold text-green-600">
            <FaLeaf className="mr-2" />
            <span>EcoCollect</span>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-green-700 hover:text-green-900">Home</Link></li>
              <li><Link to="/component" className="text-green-700 hover:text-green-900">Form</Link></li>
              <li><Link to="/wastepricing" className="text-green-700 hover:text-green-900">Pricing</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-green-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">About EcoCollect</h1>
            <p className="text-xl">Your trusted partner in sustainable waste management</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <FaRecycle className="text-5xl text-green-600 mb-4" />
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-600">
                  At EcoCollect, we're committed to creating cleaner, greener communities through innovative waste management solutions. Our mission is to make responsible waste disposal accessible and effortless for everyone.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <FaTree className="text-5xl text-green-600 mb-4" />
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-gray-600">
                  We envision a world where waste is minimized, resources are conserved, and the environment thrives. Through education, technology, and community engagement, we're working towards a sustainable future for generations to come.
                </p>
              </div>
            </div>
            <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600">
                Founded in 2020, EcoCollect began as a small initiative by a group of environmental enthusiasts. Today, we've grown into a leading waste management service, serving thousands of households and businesses across the country. Our journey is fueled by the passion to make a positive impact on our planet, one collection at a time.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 EcoCollect. All rights reserved.</p>
            <nav className="mt-4 md:mt-0">
              <Link to="/terms" className="mr-4 hover:underline">Terms of Service</Link>
              <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            </nav>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-8 left-0 right-0 flex justify-center">
        <Link 
          to="/component" 
          className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300 shadow-md"
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;