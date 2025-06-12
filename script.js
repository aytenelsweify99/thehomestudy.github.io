document.addEventListener("DOMContentLoaded", function () {
    const enrollBtn = document.getElementById("enroll-btn");
    const courseSection = document.getElementById("course-section");
    const levels = document.querySelectorAll(".level");
    const video = document.getElementById("course-video");

    // Unlock enroll button after 1 minute of watch time
    video.addEventListener("timeupdate", function () {
        if (video.currentTime >= 60) {
            enrollBtn.style.display = "block";
        }
    });

    // Show course section on Enroll click
    enrollBtn.addEventListener("click", function () {
        courseSection.style.display = "block";
        localStorage.setItem("enrolledDate", new Date().toISOString());
        unlockLevels();
    });

    // Unlock levels day by day
    function unlockLevels() {
        const enrolledDate = localStorage.getItem("enrolledDate");
        if (!enrolledDate) return;

        const now = new Date();
        const enrolled = new Date(enrolledDate);
        const daysSince = Math.floor((now - enrolled) / (1000 * 60 * 60 * 24));

        levels.forEach((level, index) => {
            if (index <= daysSince) {
                level.classList.remove("locked");
                level.innerHTML += " ✅ Unlocked";
            } else {
                level.classList.add("locked");
                level.innerHTML += " 🔒 Locked - come back later!";
            }
        });
    }

    unlockLevels();
});
