import PlaceForm from "../components/Places/PlaceForm";

function AddPlace({navigation, route}) {
  function createPlacerHander(place) {
    navigation.navigate('AllPlaces', {
      place: place
    });
  }

  return <PlaceForm onCreatePlace={createPlacerHander}/>;
}

export default AddPlace;
