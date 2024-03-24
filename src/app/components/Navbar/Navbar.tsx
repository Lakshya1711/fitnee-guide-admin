"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./Navbar.css";
import logo from "./logo.png";

const Navbar = () => {
    const [isAdminAuthenticated, setIsAdminAuthicated] = useState(false);

    const checkAdminAuthenticated = async () => {
        try {
            const response = await fetch("http://localhost:8000/admin/checklogin", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (response.ok) {
                setIsAdminAuthicated(true);
            } else {
                setIsAdminAuthicated(false);
            }
        } catch (error) {
            console.error(error);
            setIsAdminAuthicated(false);
        }
    };

    useEffect(() => {
        checkAdminAuthenticated();
    }, []);
    return (
        <div className="navbar">
            <Image src={logo} alt="Logo" width={100} className="logo" />
            <div className="adminlinks">
                {isAdminAuthenticated ? (
                    <>
                        <Link href="/pages/addworkout">Add Workout</Link>
                    </>
                ) : (
                    <>
                        <Link href="/adminauth/login">Login</Link>
                        <Link href="/adminauth/register">Signup</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
