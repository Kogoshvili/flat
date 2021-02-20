export const signIn = (credentials, props) => {
	return (dispatch) => {
		props.firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				dispatch({ type: 'LOGIN_SUCCESS' });
			})
			.catch((err) => {
				dispatch({ type: 'LOGIN_ERROR', err });
			});
	};
};

export const signOut = (props) => {
	return (dispatch) => {
		props.firebase.auth().signOut().then(() => {
			dispatch({ type: 'SIGNOUT_SUCCESS' });
		});
	};
};

export const signUp = (credentials, props) => {
	return (dispatch) => {
		console.log('creds', credentials);

		props.firebase
			.auth()
			.createUserWithEmailAndPassword(credentials.Email, credentials.password)
			.then((resp) => {
				let image = credentials.image;
				const id = resp.user.uid;
				const requests = () => {
					if (image) {
						return new Promise((resolve) => {
							let type = image.split(';')[0].split('/')[1];
							if (type == 'jpeg') type = 'jpg';
							props.firebase
								.storage()
								.ref('users/' + id + '/agent.' + type)
								.putString(image, 'data_url')
								.then((snapshot) => {
									snapshot.ref
										.getDownloadURL()
										.then((downloadURL) => {
											console.log('SUCES');
											resolve(downloadURL);
										})
										.catch((err) => {
											console.log(err);
										});
								});
						});
					} else {
						return new Promise(function(resolve) {
							setTimeout(resolve(image), 100);
						});
					}
				};
				requests()
					.then((image) => {
						props.firestore
							.collection('users')
							.doc(id)
							.set({
								firstName: credentials.firstName,
								lastName: credentials.lastName,
								phone: credentials.Phone,
								image: image
							})
							.then(() => {
								if (credentials.newAgencie) {
									props.firestore
										.collection('agencies')
										.add({
											name: credentials.name,
											email: credentials.email,
											logo: null,
											facebook: credentials.facebook,
											instagram: credentials.instagram,
											youtube: credentials.youtube,
											phone: credentials.phone,
											site: credentials.site,
											verified: false,
											agents: [ id ],
											properties: [],
											location: credentials.location,
											owner: id,
											verified: false,
											createdAt: new Date()
										})
										.then((docRef) => {
											let logo = credentials.logo;
											if (logo !== null) {
												let type = logo.split(';')[0].split('/')[1];
												if (type == 'jpeg') type = 'jpg';
												props.firebase
													.storage()
													.ref('agencies/' + docRef.id + '/logo.' + type)
													.putString(logo, 'data_url')
													.then((snapshot) => {
														snapshot.ref.getDownloadURL().then((downloadURL) => {
															props.firestore
																.collection('agencies')
																.doc(docRef.id)
																.update({
																	logo: downloadURL
																});
														});
													});
											}
										})
										.then(() => dispatch({ type: 'SIGNUP_SUCCESS' }))
										.catch((err) => {
											console.log(err);
										});
								} else {
									props.firestore
										.collection('agencies')
										.doc(credentials.agency.value)
										.update({
											agents: props.firestore.FieldValue.arrayUnion(id)
										})
										.then(() => dispatch({ type: 'SIGNUP_SUCCESS' }));
								}
							})
							.then(() => {
								console.log('here');

								props.firestore
									.collection('users')
									.doc(id)
									.update({
										agency: credentials.newAgencie ? docRef.id : credentials.agency.value,
										agencyName: credentials.newAgencie ? credentials.name : credentials.agency.label
									})
									.catch((err) => {
										console.log(err);
									});
							})
							.catch((err) => {
								console.log(err);
							});
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
				dispatch({ type: 'SINGUP_ERROR', err });
			});
	};
};
export const loadProfile = (id, profile, firestore) => {
	return (dispatch) => {
		let info = profile;
		info.Phone = profile.phone ? profile.phone : info.Phone ? info.Phone : null;
		info.Email = id.email;
		console.log('info', info);

		if (info.agency)
			firestore
				.collection('agencies')
				.doc(profile.agency)
				.get()
				.then((data) => {
					data = data.data();

					if (id.uid === data.owner) {
						info = { ...info, ...data };
					}
					dispatch({ type: 'LOAD_SUCCESS', info });
				})
				.catch((e) => {
					dispatch({ type: 'ERR_LOAD_SUCCESS', e });
				});
	};
};
export const editProfile = (creds, oldCreds, firestore, firebase) => {
	return (dispatch) => {
		const requests = () => {
			if (oldCreds.image !== creds.image) {
				console.log('newImage');

				return new Promise((resolve) => {
					let type = creds.image.split(';')[0].split('/')[1];
					if (type == 'jpeg') type = 'jpg';
					if (oldCreds.image !== null) {
						console.log('delOld');

						firebase
							.storage()
							.refFromURL(oldCreds.image)
							.delete()
							.then(() => {
								firebase
									.storage()
									.ref('users/' + creds.id + '/agent.' + type)
									.putString(creds.image, 'data_url')
									.then((snapshot) => {
										snapshot.ref
											.getDownloadURL()
											.then((downloadURL) => {
												console.log('SUCES');
												resolve(downloadURL);
											})
											.catch((err) => {
												console.log(err);
											});
									})
									.catch((e) => {
										console.log('err', e);
									});
							})
							.catch((e) => {
								console.log('err', e);
							});
					} else {
						console.log('noOld');

						firebase
							.storage()
							.ref('users/' + creds.id + '/agent.' + type)
							.putString(creds.image, 'data_url')
							.then((snapshot) => {
								snapshot.ref
									.getDownloadURL()
									.then((downloadURL) => {
										console.log('SUCES');
										resolve(downloadURL);
									})
									.catch((err) => {
										console.log(err);
									});
							})
							.catch((e) => {
								console.log('err', e);
							});
					}
				});
			} else {
				console.log('noImageChange');

				return new Promise(function(resolve) {
					setTimeout(resolve(creds.image), 100);
				});
			}
		};
		requests().then((image) => {
			console.log('imageEnd');

			firestore
				.collection('users')
				.doc(creds.id)
				.update({
					firstName: creds.firstName,
					lastName: creds.lastName,
					phone: creds.Phone,
					image: image
				})
				.then(() => {
					console.log('editProfileEnd');

					if (oldCreds.owner) {
						console.log('editAgency');

						const requests = () => {
							if (oldCreds.logo !== creds.logo) {
								console.log('newLogo');

								return new Promise((resolve) => {
									let type = creds.logo.split(';')[0].split('/')[1];
									if (type == 'jpeg') type = 'jpg';
									if (oldCreds.logo !== null) {
										console.log('delOldLog');

										firebase
											.storage()
											.refFromURL(oldCreds.logo)
											.delete()
											.then(() => {
												firebase
													.storage()
													.ref('agencies/' + creds.agency + '/logo.' + type)
													.putString(creds.logo, 'data_url')
													.then((snapshot) => {
														snapshot.ref
															.getDownloadURL()
															.then((downloadURL) => {
																console.log('SUCES');
																resolve(downloadURL);
															})
															.catch((err) => {
																console.log(err);
															});
													})
													.catch((e) => {
														console.log('err', e);
													});
											})
											.catch((e) => {
												console.log('err', e);
											});
									} else {
										console.log('noOldLogo');

										firesbase
											.storage()
											.ref('agencies/' + creds.agency + '/logo.' + type)
											.putString(creds.logo, 'data_url')
											.then((snapshot) => {
												snapshot.ref
													.getDownloadURL()
													.then((downloadURL) => {
														console.log('SUCES');
														resolve(downloadURL);
													})
													.catch((err) => {
														console.log(err);
													});
											})
											.catch((e) => {
												console.log('err', e);
											});
									}
								});
							} else {
								return new Promise(function(resolve) {
									setTimeout(resolve(creds.logo), 100);
								});
							}
						};
						requests().then((logo) => {
							console.log('endLogo', creds);

							firestore
								.collection('agencies')
								.doc(oldCreds.agency)
								.update({
									name: creds.name,
									logo: logo,
									facebook: creds.facebook,
									instagram: creds.instagram,
									youtube: creds.youtube,
									phone: creds.phone,
									site: creds.site,
									location: creds.location
								})
								.then(() => {
									if (creds.password) {
										firebase.auth().currentUser.updatePassword(creds.password).then(() => {
											dispatch({ type: 'EDIT_SUCCESS' });
										});
									} else {
										dispatch({ type: 'EDIT_SUCCESS' });
									}
								})
								.catch((e) => {
									console.log('err', e);
								});
						});
					} else {
						if (creds.password) {
							firebase.auth().currentUser.updatePassword(creds.password).then(() => {
								dispatch({ type: 'EDIT_SUCCESS' });
							});
						} else {
							dispatch({ type: 'EDIT_SUCCESS' });
						}
					}
				})
				.catch((e) => {
					console.log('err', e);
				});
		});
	};
};
