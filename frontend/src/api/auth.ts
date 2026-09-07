
export async function signup(){
    
}

export const fakeApiCall = (): Promise<{ success: boolean; message?: string }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // simulate random success/failure to also test error handling
            const isSuccess = Math.random() > 0.5;

            if (isSuccess) {
                resolve({ success: true });
            } else {
                resolve({ success: false, message: "Invalid email or password" });
            }
        }, 3000); // 2 second delay to visibly see isSubmitting = true
    });
};