import * as userService from '../../utilities/users-service';
import Autocomplete from './Autocomplete';

export default function OrderHistoryPage() {

    //we'll need to put our routes in here

    return(
        <>
        <h1> Select your filters </h1>
        <div className="needFilterContainer">
            <Autocomplete
                suggestions={
                    ['CPR Certified', 'Pet Friendly', 'Can Drive', 'Fluent in English', 'Fluent in Spanish', 'Arts & Crafts', 'First Aid Certified', 'Tutoring Assistance', 'Open Communication']
                }
            />
        </div>

        <div className="wantFilterContainer">
            <Autocomplete 
            suggestions={
                ['Age 18-30', 'Age 31-45', 'Age 46-64', 'Age 65+', 'Able to Drive']
            }
            />
        </div>
        
        {/* here we will need to render in a component that shows the search results*/}
        
        </>

        
    );
}