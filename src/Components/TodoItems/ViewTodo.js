const ViewTodo = (props) => {
    return <div className="container mt-5">
        <h3>View Todo</h3>
        <div className="row">
            <div className="col-md-12">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Task</th>
                                <th colSpan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.viewTask.map(view => (
                                <tr key={view._id}>
                                    <td>{view.Subject}</td>
                                    <td>{view.Task}</td>
                                    <td onClick={() => { props.handleUpdateTodo(view._id) }}><i className="fa fa-pencil text-success"></i></td>
                                    <td onClick={() => { props.handleRemoveTodo(view._id) }}><i className="fa fa-trash text-danger"></i></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div >
}

export default ViewTodo