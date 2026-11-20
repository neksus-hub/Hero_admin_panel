const HeroesListItem = ({ id, name, description, element, handleDelete }) => {

	let elementClassName;

	switch (element) {
		case "fire":
			elementClassName = "bg-danger bg-gradient";
			break;
		case "water":
			elementClassName = "bg-primary bg-gradient";
			break;
		case "wind":
			elementClassName = "bg-success bg-gradient";
			break;
		case "earth":
			elementClassName = "bg-secondary bg-gradient";
			break;
		default:
			elementClassName = "bg-warning bg-gradient";
	}

	return (
		<li
			className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
		>
			<img
				src="https://static.vecteezy.com/system/resources/previews/036/594/092/large_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
				className="img-fluid w-25 d-inline"
				alt="unknown hero"
				style={{ objectFit: "cover", borderRadius: '5px'}}
			/>
			<div className="card-body">
				<h3 className="card-title">{name}</h3>
				<p className="card-text">{description}</p>
			</div>
			<span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
				<button
					type="button"
					className="btn-close btn-close"
					aria-label="Close"
					onClick={() => handleDelete(id)}
				></button>
			</span>
		</li>
	);
};

export default HeroesListItem;
