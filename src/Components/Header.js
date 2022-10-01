import React, { useEffect, useRef } from 'react';
import logo from "../assets/logo.svg";

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
		}
		else{
			header.classList.remove("shadow");
		}
	}

	const handleMenuToggleClick = element => {
		element.target.classList.toggle("active");

		const linkContainer = linkContainerRef.current;
		const header = headerRef.current;
		linkContainer.classList.toggle("active");
		header.classList.add("shadow");
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
		<header className="header sticky" ref={headerRef}>
			<div className="header-left-section">
				<div className="menu-toggle" onClick={handleMenuToggleClick}>
						<span></span>
						<span></span>
						<span></span>
				</div>
				<a href="#" className="logo-link">
					<div className="logo-container">
							<img src={logo} alt="logo-img" className="logo" />
							<h1 className="logo-caption">Simon's&nbsp;Blog</h1>
					</div>
				</a>
				<div className="link-container" ref={linkContainerRef}>
					<a href="#" className="link">Главная</a>
					<a href="#" className="link">Портфолио</a>
					<a href="#" className="link">Контакты</a>
					<a href="#" className="link">Блог</a>
				</div>
			</div>
			<div className="header-right-section">
				<div className="dropdown" data-dropdown>
					<button className="link-button info-button__transparent" data-dropdown-button>Войти</button>
					<div className="dropdown-menu">
						<form action="" className="login-form">
							<label htmlFor="email">Логин</label>
							<input type="email" name="email" id="email" placeholder="email@example.com" />
							<label htmlFor="password">Пароль</label>
							<input type="password" name="password" id="password" placeholder="example" />
							<button type="submit" className="info-button__solid">Войти</button><br/>
							<a href="#" className="registration-link">Зарегистрироваться</a>
						</form>
					</div>
				</div>
			</div>
		</header>
	)
}
