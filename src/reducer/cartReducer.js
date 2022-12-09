const cartReducer = (state, action) => {
	//to add items in cart
	if (action.type === "ADD_TO_CART") {
		console.log(state.cart);
		let { id, amount, color, product } = action.payload;
		const { name, price } = product;
		//finding existing product
		let existingProduct = state.cart.find((currElem) => currElem.id === id + color);
		if (existingProduct) {
			let updatedProuduct = state.cart.map((currElem) => {
				if (currElem.id === id + color) {
					let newAmount = currElem.amount + amount; //finding the new amount
					if (newAmount >= currElem.max) {
						//checking that endtered amount doesn't exceeds the stock limit
						newAmount = currElem.max;
					}
					return {
						...currElem,
						amount: newAmount,
					};
				} else {
					return currElem;
				}
			});
			return {
				...state,
				cart: updatedProuduct,
			};
		} else {
			let cartProduct = {
				id: id + color,
				amount: amount,
				color: color,
				name: product.name,
				price: product.price,
				image: product.image[0].url,
				max: product.stock,
			};
			return {
				...state,
				cart: [...state.cart, cartProduct],
			};
		}
	}
	// to remove items from cart
	if (action.type === "REMOVE_FROM_CART") {
		let { id } = action.payload;
		return {
			...state,
			cart: state.cart.filter((x) => x.id !== id),
		};
	}
	//to clear the cart item
	if (action.type === "CLEAR_CART") {
		return {
			...state,
			cart: [],
		};
	}
	// to increase the amount in cart item
	if (action.type === "SET_DECREMENT") {
		console.log(state.cart);
		let updatedProduct = state.cart.map((currElem) => {
			if (currElem.id === action.payload) {
				let decAmount = currElem.amount - 1;
				if (decAmount <= 1) {
					decAmount = 1;
				}
				return {
					...currElem,
					amount: decAmount,
				};
			} else {
				return {
					...currElem,
				};
			}
		});
		return {
			...state,
			cart: updatedProduct,
		};
	}
	// to decrease the amount in cart item
	if (action.type === "SET_INCREMENT") {
		let updatedProduct = state.cart.map((currElem) => {
			if (currElem.id === action.payload) {
				let incAmount = currElem.amount + 1;
				if (incAmount > currElem.max) {
					incAmount = currElem.max;
				}
				return {
					...currElem,
					amount: incAmount,
				};
			} else {
				return {
					...currElem,
				};
			}
		});
		return {
			...state,
			cart: updatedProduct,
		};
	}

	if (action.type === "CART_ITEM_UPDATE") {
		let updateCartValue = state.cart.reduce((acc, curr) => {
			let { amount } = curr;
			acc = acc + amount;
			return acc;
		}, 0);
		console.log(updateCartValue);
		return {
			...state,
			total_item: updateCartValue,
		};
	}

	if (action.type === "CART_PRICE_UPDATE") {
		let totalUpdateValue = state.cart.reduce((acc, curr) => {
			let { amount, price } = curr;
			acc = acc + amount * price;
			return acc;
		}, 0);
		return {
			...state,
			total_price: totalUpdateValue,
		};
	}
	return state;
};

export default cartReducer;