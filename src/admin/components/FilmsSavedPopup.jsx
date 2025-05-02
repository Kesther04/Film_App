
export default function FilmsSavedPopup({videoData,videoFn}) {
    return (
        <section className="popup">
            <div className="popup-box">
            <p className="py-2  font-bold text-xl text-cyan-500">Do you Wish to Re-upload your Videos</p>
                <div className="btn flex gap-2 justify-center">
                    <button onClick={()=>videoFn({...videoData,status:false})}>No</button>
                    <button onClick={()=>videoFn({...videoData,isSaved:[]})}>Yes</button>
                </div>
            </div>

        </section>
    );
}