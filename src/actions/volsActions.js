export const fetchVols = () => async (dispatch) => {
  dispatch({ type: 'FETCH_VOLS_START' });
  
  try {
    const response = await fetch('https://volsapii.vercel.app/api/vols'); // Utilise '/api/vols' car Vite redirigera cette requête vers l'API
    if (!response.ok) {
      throw new Error('Failed to fetch flights');
    }
    const data = await response.json();
    
    // Transform the data to match our expected structure
    const transformedData = data.map(vol => ({
      id: vol.id.toString(),
      villeDepart: vol.villedepart,
      villeArrivee: vol.villearrivee,
      prix: vol.prix,
      date: vol.date,
      image: '../actions/vol.png',
      services: [],
    }));
    
    dispatch({
      type: 'FETCH_VOLS_SUCCESS',
      payload: transformedData
    });
  } catch (error) {
    console.error('Error fetching flights:', error);
    dispatch({
      type: 'FETCH_VOLS_ERROR',
      payload: error.message
    });
  }
};
