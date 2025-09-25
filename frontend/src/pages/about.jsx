import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Users, Target, Lightbulb, Heart, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 p-6 max-w-6xl mx-auto">
      
      {/* Section 1: Our Mission */}
      <Card className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-lg">
        <CardHeader className="flex items-center space-x-4">
          <Target className="w-10 h-10 text-indigo-600" />
          <div>
            <CardTitle className="text-2xl font-bold">Our Mission</CardTitle>
            <CardDescription>What drives us every day</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg">
            Our mission is to deliver innovative solutions that empower businesses and individuals to reach their full potential.
          </p>
        </CardContent>
      </Card>

      {/* Section 2: Our Vision */}
      <Card className="bg-gradient-to-r from-green-100 via-teal-100 to-cyan-100 shadow-lg">
        <CardHeader className="flex items-center space-x-4">
          <Lightbulb className="w-10 h-10 text-green-600" />
          <div>
            <CardTitle className="text-2xl font-bold">Our Vision</CardTitle>
            <CardDescription>Where we are headed</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg">
            We envision a world where technology bridges gaps, enhances experiences, and creates value for everyone.
          </p>
        </CardContent>
      </Card>

      {/* Section 3: Our Team */}
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex items-center space-x-4">
          <Users className="w-10 h-10 text-blue-600" />
          <div>
            <CardTitle className="text-2xl font-bold">Our Team</CardTitle>
            <CardDescription>The people behind the success</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {[
            { name: "Abhishek Kushwaha", role: "Founder & CEO", desc: "Leading the team with vision and dedication.", img: "https://i.pravatar.cc/150?img=1" },
            { name: "Jane Doe", role: "CTO", desc: "Expert in building scalable and efficient systems.", img: "https://i.pravatar.cc/150?img=2" },
            { name: "John Smith", role: "Lead Designer", desc: "Crafting beautiful experiences for our users.", img: "https://i.pravatar.cc/150?img=3" },
          ].map((member, index) => (
            <Card key={index} className="bg-gray-50 text-center p-6 rounded-lg shadow-md">
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <CardTitle className="text-xl font-semibold">{member.name}</CardTitle>
              <CardDescription className="text-sm text-gray-500">{member.role}</CardDescription>
              <p className="mt-2 text-gray-700">{member.desc}</p>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Section 4: Our Values */}
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex items-center space-x-4">
          <Heart className="w-10 h-10 text-red-500" />
          <div>
            <CardTitle className="text-2xl font-bold">Our Values</CardTitle>
            <CardDescription>What we stand for</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {[
            { icon: Lightbulb, title: "Innovation", desc: "We embrace creativity to deliver cutting-edge solutions." },
            { icon: Target, title: "Integrity", desc: "We act honestly and ethically in everything we do." },
            { icon: Users, title: "Customer Focus", desc: "We put our clients’ needs at the heart of our work." },
          ].map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="bg-gray-50 p-6 text-center rounded-lg shadow-md hover:shadow-lg transition">
                <Icon className="w-8 h-8 mx-auto text-indigo-600 mb-3" />
                <CardTitle className="text-lg font-semibold">{value.title}</CardTitle>
                <p className="text-gray-700 mt-2">{value.desc}</p>
              </Card>
            );
          })}
        </CardContent>
      </Card>

      {/* Section 5: Contact Us */}
      <Card className="bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 shadow-lg text-center">
        <CardHeader className="flex flex-col items-center space-y-2">
          <Mail className="w-10 h-10 text-red-600" />
          <div>
            <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
            <CardDescription>We would love to hear from you</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg">Have a question or want to work with us? Reach out anytime!</p>
          <Button className="mt-4" onClick={() => navigate("/contact")}>
            Get in Touch
          </Button>
        </CardContent>
      </Card>

    </div>
  );
};

export default AboutUs;
