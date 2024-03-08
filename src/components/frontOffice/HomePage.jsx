import {SearchIcon} from '@heroicons/react/outline';

const HomePage = () => {
    return (
        <>
            <main>
                <form className="max-w-xl mx-auto text-center">
                    <div className="relative flex lg:inline-flex items-center bg-gray-50 rounded-xl">
                        <div className="absolute inset-y-0 flex items-center pl-2">
                            <SearchIcon className="h-6 text-gray-600"/>
                        </div>
                        <input
                            type="text"
                            className="bg-transparent w-full pl-12 py-4 focus:outline-none"
                            placeholder="Search for events"
                        />
                    </div>
                    <div className="relative flex lg:inline-flex items-center bg-gray-50 rounded-xl mt-4">
                        <select className="bg-transparent w-full pl-12 py-4 focus:outline-none">
                            <option value="all">All categories</option>
                            <option value="music">Music</option>
                            <option value="sports">Sports</option>
                            <option value="theater">Theater</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </form>
                
            </main>
        </>
    );
}

export default HomePage;
