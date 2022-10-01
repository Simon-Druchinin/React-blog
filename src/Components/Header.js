import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from "../assets/logo.svg";

import Home from "../Pages/Home";
import Portfolio from "../Pages/Portfolio";
import Contacts from "../Pages/Contacts";
import Blog from "../Pages/Blog";

export default function Header(){
	const handleDropDownClick = event => {
		const isDropdownButton = event.target.matches("[data-dropdown-button]");
		if(!isDropdownButton && event.target.closest("[data-dropdown]") != null) return;

		let currentDropdown;
		if(isDropdownButton){
			currentDropdown = event.target.closest("[data-dropdown]");
			currentDropdown.classList.toggle("active");
		}

		document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
			if(dropdown === currentDropdown) return;
			dropdown.classList.remove("active");
		})
	}

	const handleHeaderScroll = () => {
		const header = headerRef.current;
		if(window.scrollY != 0){
			header.classList.add("shadow");
			header.classList.add("sticky");
		}
		else{
			header.classList.remove("shadow");
			header.classList.remove("sticky");
		}
	}

	const handleMenuToggleClick = element => {
		element.target.classList.toggle("active");

		const linkContainer = linkContainerRef.current;
		const header = headerRef.current;
		linkContainer.classList.toggle("active");
		
		if(window.scrollY == 0){
			header.classList.toggle("shadow");
		}
		else{
			header.classList.add("shadow");
		}
		
	}

	const headerRef = useRef(null);
	const linkContainerRef = useRef(null);

	useEffect(() => {
		window.addEventListener("click", handleDropDownClick)
		window.addEventListener("scroll", handleHeaderScroll)

		return () => {
			window.removeEventListener("click", handleDropDownClick)
			window.removeEventListener("scroll", handleHeaderScroll)
		}
	})

	return(
		<>
			<header className="header" ref={headerRef}>
				<div className="header-left-section">
					<div className="menu-toggle" onClick={handleMenuToggleClick}>
							<span></span>
							<span></span>
							<span></span>
					</div>
					<a href="/" className="logo-link">
						<div className="logo-container">
								<img src={logo} alt="logo-img" className="logo" />
								<h1 className="logo-caption">Simon's&nbsp;Blog</h1>
						</div>
					</a>
					<div className="link-container" ref={linkContainerRef}>
						<a href="/" className="link">Главная</a>
						<a href="/portfolio" className="link">Портфолио</a>
						<a href="/contacts" className="link">Контакты</a>
						<a href="/blog" className="link">Блог</a>
					</div>
				</div>
				<div className="header-right-section">
					<div className="dropdown" data-dropdown>
						<button className="link-button info-button__transparent" data-dropdown-button>Войти</button>
						<div className="dropdown-menu">
							<form action="" className="login-form">
								<label htmlFor="email">Логин</label><br/>
								<input type="email" name="email" id="email" placeholder="email@example.com" />
								<label htmlFor="password">Пароль</label><br/>
								<input type="password" name="password" id="password" placeholder="example" />
								<button type="submit" className="info-button__solid">Войти</button><br/>
								<a href="#" className="registration-link">Зарегистрироваться</a>
							</form>
						</div>
					</div>
				</div>
			</header>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/portfolio" element={<Portfolio />} />
					<Route path="/contacts" element={<Contacts />} />
					<Route path="/blog" element={<Blog />} />
				</Routes>
			</Router>
		</>
	)
}
