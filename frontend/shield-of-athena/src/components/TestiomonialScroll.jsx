import { useEffect, useState } from "react";
import "./css/TestimonialScroll.css";
import avatar from "../assets/avatar_picture.jpg"


export default function TestiomonialScroll() {
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  
  
  const testimonials = [
    {
      text: "Bouclier d'Athéna helped my family feel safe and supported. Their team was present at every step and made sure we had the resources we needed.",
      name: "Mackie Clonts",
      role: "Former client, now volunteer"
    },
    {
      text: "The support and guidance I received was life-changing. I couldn't have navigated this difficult time without their compassionate team.",
      name: "Sarah Johnson",
      role: "Community member"
    },
    {
      text: "Professional, caring, and always available. They truly go above and beyond to help those in need.",
      name: "Michael Chen",
      role: "Local advocate"
    },
    {
      text: "Their dedication to helping families is remarkable. I'm grateful for everything they've done for our community.",
      name: "Emily Rodriguez",
      role: "Volunteer coordinator"
    },
    {
      text: "A beacon of hope during challenging times. Their services made all the difference for my family.",
      name: "David Thompson",
      role: "Former client"
    }
  ];

  return (
    <div className="scroll-wrapper">
        <div className= "scroll-content">

          {testimonials.concat(testimonials).map((item, i) =>(
              <div key={i} className= {`scroll-card`}
                >
                <p className="wheel-text">{item.text}</p>

                <div className="wheel-person">
                  <img src={avatar} className="wheel-avatar" />
                  <div>
                    <p className="wheel-name">{item.name}</p>
                    <p className="wheel-role">{item.role}</p>
                  </div>
                </div>
              </div>
            )
          )}     
        </div>
    </div>
  );
}