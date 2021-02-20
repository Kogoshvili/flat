import Axios from 'axios';
import { getFormNames } from 'redux-form';

export const createProperty = (data, props) => {
	return (dispatch) => {
		data.priority = 1;
		let images = data.images;
		delete data.images;
		let imageList = [];
		// 	const files = acceptedFiles;
		// 	files.forEach((file) => {
		// 		const reader = new FileReader();
		// 		reader.addEventListener(
		// 			'load',
		// 			() => {
		// 				this.setState((prevState) => {
		// 					let k = prevState.images;
		// 					k.push({ id: k.length, src: reader.result });
		// 					return {
		// 						images: k
		// 					};
		// 				});
		// 			},
		// 			false
		// 		);
		// 		reader.readAsDataURL(file);
		// 	});
		// }}
		if (data.category.value !== 'land') {
			console.log('1');
			Axios.post('https://flatrima.herokuapp.com/api/properties', data)
				.then((id) => {
					console.log('2', id.data);

					id = id.data;
					let requests = images.map((image) => {
						return new Promise((resolve) => {
							let type = image.src.split(';')[0].split('/')[1];
							if (type == 'jpeg') type = 'jpg';
							props.firebase
								.storage()
								.ref('properties/' + id + '/' + (image.id + 1) + '.' + type)
								.putString(image.src, 'data_url')
								.then((snapshot) => {
									snapshot.ref
										.getDownloadURL()
										.then((downloadURL) => {
											imageList.push(downloadURL);
											resolve();
										})
										.catch((err) => {
											console.log('upload error', err);
										});
								})
								.catch((err) => {
									console.log('upload error', err);
								});
						});
					});
					Promise.all(requests)
						.then(() => {
							console.log('3', data);

							Axios.put('https://flatrima.herokuapp.com/api/properties/' + id, {
								images: imageList.length > 0 ? imageList : '[]'
							})
								.then((e) => {
									console.log('add sucess', data.agencyID);
									props.firestore
										.collection('agencies')
										.doc(data.agencyID)
										.update({
											properties: props.firebase.firestore.FieldValue.arrayUnion(id)
										})
										.then(() => dispatch({ type: 'CREATE_PROPERTY', id }));
								})
								.catch((err) => {
									console.log('add error');
									dispatch({ type: 'CREATE_PROPERTY_ERROR', err });
								});
						})
						.catch((err) => {
							console.log('upload all error');
							dispatch({ type: 'CREATE_PROPERTY_ERROR', err });
						});
				})
				.catch((e) => console.log(e));
		} else {
			console.log('LAND');
			Axios.post('https://flatrima.herokuapp.com/api/lands', data)
				.then((response) => {
					console.log('2', response.data);

					const id = response.data;
					let requests = images.map((image) => {
						return new Promise((resolve) => {
							let type = image.src.split(';')[0].split('/')[1];
							if (type == 'jpeg') type = 'jpg';
							props.firebase
								.storage()
								.ref('lands/' + id + '/' + (image.id + 1) + '.' + type)
								.putString(image.src, 'data_url')
								.then((snapshot) => {
									snapshot.ref
										.getDownloadURL()
										.then((downloadURL) => {
											imageList.push(downloadURL);
											resolve();
										})
										.catch((err) => {
											console.log('upload error', err);
										});
								})
								.catch((err) => {
									console.log('upload error', err);
								});
						});
					});
					Promise.all(requests)
						.then(() => {
							console.log('3');

							Axios.put('https://flatrima.herokuapp.com/api/lands/' + id, {
								images: imageList.length > 0 ? imageList : '[]'
							})
								.then((e) => {
									console.log('add sucess', e);
									props.firestore
										.collection('agencies')
										.doc(data.agencyID)
										.update({
											properties: props.firebase.firestore.FieldValue.arrayUnion(id)
										})
										.then(() => dispatch({ type: 'CREATE_PROPERTY', id }));
								})
								.catch((err) => {
									console.log('add error');
									dispatch({ type: 'CREATE_PROPERTY_ERROR', err });
								});
						})
						.catch((err) => {
							console.log('upload all error');
							dispatch({ type: 'CREATE_PROPERTY_ERROR', err });
						});
				})
				.catch((e) => console.log(e));
		}
	};
};
export const editProperty = (data, props) => {
	console.log('edit', data);

	return (dispatch) => {
		const type = data.category.value;
		const id = data.id;
		const apiLnk = 'https://flatrima.herokuapp.com/api/' + (type !== 'land' ? 'properties/' : 'lands/');
		Axios.get(apiLnk + id, data).then((imgs) => {
			///if (imgs.data.images !== null && imgs.data.images !== '[]') {
			let imgLst = JSON.parse(imgs.data.images);
			let dels = imgLst;
			///}
			let images = data.images ? data.images : [];
			delete data.images;
			//console.log('images', images);
			//let images2 = images.map((i) => i.src);
			// //console.log(images2, imgLst2);

			//let dels = imgLst.map((i) => {
			// 	if (!images2.includes(i)) {
			// 		return i;
			// 	}
			// });

			//let dels = imgLst ? imgLst : [];

			//console.log('dels', dels);
			//if (dels.length === 1 && dels.includes(undefined)) dels = [];
			//console.log('images2', images2);
			//console.log('imglst2', imgLst);
			console.log('dels', dels);
			let imageList = [];
			let delReq = dels.map((url) => {
				return new Promise((resolve) => {
					// if (url === undefined) {
					// 	resolve();
					// }
					props.firebase
						.storage()
						.refFromURL(url)
						.delete()
						.then(() => {
							console.log(url);

							resolve();
						})
						.catch((err) => {
							console.log('delete error', err);
							resolve();
						});
				});
			});
			Promise.all(delReq).then(() => {
				// function getName(paragraph) {
				// 	let regex = new RegExp('%2F' + id + '%2F[d+]', 'g');

				// 	let found = paragraph.match(regex)[0];
				// 	regex = /%2F[\d+]/g;
				// 	found = found.match(regex)[1];
				// 	regex = /F[\d+]/g;
				// 	found = found.match(regex)[0];
				// 	regex = /[\d+]/g;
				// 	found = found.match(regex);
				// 	return found;
				// }
				console.log('delReq');
				//let imgID = [];
				let requests = images.map((image) => {
					return new Promise((resolve) => {
						//console.log(image);
						//if (!image.src.includes('base64')) {
						//console.log('resolv', image);

						// 	let name = getName(image.src);
						// 	imgID.push(parseInt(name));
						// 	console.log('name', name);

						// 	imageList.push(image.src);
						// 	resolve();
						// } else {
						// 	console.log('str', image);
						console.log('here', image);

						let typeImg = image.src.split(';')[0].split('/')[1];
						if (typeImg == 'jpeg') typeImg = 'jpg';
						//imgID.sort();
						//let imgName = image.id;
						// if (imgID.includes(parseInt(imgName))) {
						// 	imgName = imgID[imgID.length - 1] + 1;
						// 	imgID.push(imgName);
						// }
						props.firebase
							.storage()
							.ref(
								(type !== 'land' ? 'properties/' : 'lands/') + id + '/' + (image.id + 1) + '.' + typeImg
							)
							.putString(image.src, 'data_url')
							.then((snapshot) => {
								snapshot.ref
									.getDownloadURL()
									.then((downloadURL) => {
										imageList[image.id] = downloadURL;
										resolve();
									})
									.catch((err) => {
										console.log('upload error', err);
									});
							})
							.catch((err) => {
								console.log('upload error', err);
							});
						//}
					});
				});
				Promise.all(requests).then(() => {
					const apiLnk = 'https://flatrima.herokuapp.com/api/' + (type !== 'land' ? 'properties/' : 'lands/');
					console.log('req', apiLnk);

					Axios.put(apiLnk + id, data)
						.then(() => {
							console.log(imageList);

							Axios.put(apiLnk + id, {
								images: imageList.length > 0 ? imageList : '[]'
							})
								.then((res) => console.log(res))
								.catch((e) => console.log(e));
						})
						.catch((e) => console.log(e));
				});
			});
		});
	};
};
export const removeProperty = (data, props) => {
	console.log('remove', data);
	return (dispatch) => {
		// const apiLnk = 'https://flatrima.herokuapp.com/api/' + (type !== 'land' ? 'properties/' : 'lands/');
		// Axios.get(apiLnk + id, data).then((imgs) => {
		// 	///if (imgs.data.images !== null && imgs.data.images !== '[]') {
		// 	let imgLst = JSON.parse(imgs.data.images);
		// 	let dels = imgLst;
		// 	let delReq = dels.map((url) => {
		// 		return new Promise((resolve) => {
		// 			// if (url === undefined) {
		// 			// 	resolve();
		// 			// }
		// 			props.firebase
		// 				.storage()
		// 				.refFromURL(url)
		// 				.delete()
		// 				.then(() => {
		// 					console.log(url);
		// 					resolve();
		// 				})
		// 				.catch((err) => {
		// 					console.log('delete error', err);
		// 					resolve();
		// 				});
		// 		});
		// 	});
		// 	Promise.all(delReq).then(() => {
		// 		// Axios.delete('https://flatrima.herokuapp.com/api/properties/' + data)
		// 		// 	.then(() => dispatch({ type: 'DELETE_PROPERTY_SUCCESS' }))
		// 		// 	.catch((err) => dispatch({ type: 'DELETE_PROPERTY_ERROR', err }));
		// 	});
		// });
	};
};
export const loadProperty = (id) => {
	if (id) {
		return (dispatch) => {
			const currencies = [
				{ value: 'GEL', label: '₾' },
				{ value: 'USD', label: '$' },
				{ value: 'EUR', label: '€' },
				{ value: 'RUB', label: '₽' }
			];
			Axios.get('https://flatrima.herokuapp.com/api/properties/' + id).then((data) => {
				data = data.data;

				if (data.images !== null && data.images !== '[]') {
					data.images = JSON.parse(data.images);
					const imgs = data.images.map((img, index) => {
						return { id: index, src: img };
					});
					//data.origImgs = imgs;
					data.images = imgs;
				} else {
					//data.origImgs = [];
					data.images = [];
				}
				data.category = { value: data.category, label: data.categoryGe };
				data.contract = { value: data.contract, label: data.contractGe };
				data.status ? (data.status = { value: data.status, label: data.statusGe }) : delete data.status;
				data.condition
					? (data.condition = { value: data.quality, label: data.qualityGe })
					: delete data.condition;
				data.city = { value: data.city, label: data.cityGe };
				data.district = { value: data.district, label: data.districtGe };
				data.street ? (data.street = { value: data.street, label: data.streetGe }) : delete data.street;
				data.parking ? (data.parking = { value: data.parking, label: data.parkingGe }) : delete data.parking;
				data.heating ? (data.heating = { value: data.heating, label: data.heatingGe }) : delete data.heating;
				data.hotWater
					? (data.hotWater = { value: data.hotWater, label: data.hotWaterGe })
					: delete data.hotWater;
				data.storeroom
					? (data.storeroom = { value: data.storeroom, label: data.storeroomGe })
					: delete data.storeroom;
				data.eBalcony = data.balcony !== null && data.balcony !== -1 ? true : false;
				data.eVeranda = data.veranda !== null && data.veranda !== -1 ? true : false;
				data.eLoggia = data.loggia !== null && data.loggia !== -1 ? true : false;
				data.currency = currencies[data.currency];
				dispatch({ type: 'LOAD_PROPERTY', data });
			});
		};
	} else {
		return (dispatch) => {
			const data = {
				category: { value: 'apartment', label: 'ბინა' },
				currency: { value: 'GEL', label: '₾' }
			};
			dispatch({ type: 'LOAD_PROPERTY', data });
		};
	}
};
